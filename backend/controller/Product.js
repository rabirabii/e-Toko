const { Op } = require("sequelize");
const { User, Category, Product } = require("../database");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const { parse } = require("dotenv");

// Create A Product
const createProduct = catchAsyncError(async (req, res, next) => {
  const { name, description, price, categoryId, quantity } = req.body;

  const seller = await User.findByPk(req.user.id);

  if (!seller || seller.role !== "seller") {
    return next(new ErrorHandler("Only seller can create a product", 403));
  }

  const category = await Category.findByPk(categoryId);

  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }

  //   Create Product
  const product = await Product.create({
    name,
    description,
    price,
    categoryId,
    quantity,
    images: req.body.images || [],
    sellerId: req.user.id,
  });

  res.status(201).json({
    success: true,
    product,
    message: "Product created successfully",
  });
});

// Update Product
const updateProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { name, description, price, categoryId, quantity, images } = req.body;

  let product = await Product.findByPk(id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  if (product.sellerId !== req.user.id) {
    return next(
      new ErrorHandler("You are not authorized to update this product", 403)
    );
  }

  const category = await Category.findByPk(categoryId);

  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }

  product.name = name;
  product.description = description;
  product.price = price;
  product.categoryId = categoryId;
  product.quantity = quantity;
  product.images = images;

  await product.save();

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product,
  });
});

// Delete Product by id
const deleteProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findByPk(id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  if (product.sellerId !== req.user.id) {
    return next(
      new ErrorHandler("You are not authorized to delete this product", 403)
    );
  }

  await product.destroy();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    product,
  });
});

// Get Product by Id
const getProductById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ["id", "name", "email"],
      },
      {
        model: Category,
        attributes: ["id", "name"],
      },
    ],
  });

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Get All Products
const getAllProducts = catchAsyncError(async (req, res, next) => {
  const {
    page = 1,
    limit = 10,
    category,
    sort,
    price,
    rating,
    search,
  } = req.query;

  const offset = (page - 1) * limit;

  const whereClause = {};

  if (category) {
    const categoryRecord = await Category.findOne({
      where: { name: category },
    });
    if (categoryRecord) {
      whereClause.categoryId = categoryRecord.id;
    }
  }

  if (price) {
    const priceRange = price.split("-");
    if (priceRange.length === 2) {
      whereClause.price = {
        [Op.between]: [parseFloat(priceRange[0]), parseFloat(priceRange[1])],
      };
    }
  }

  if (rating) {
    whereClause.rating = {
      [Op.gte]: parseFloat(rating),
    };
  }

  if (search) {
    whereClause.name = {
      [Op.like]: `%${search}%`,
    };
  }

  let order = [];
  if (sort === "price_asc") {
    order.push(["price", "ASC"]);
  } else if (sort === "price_desc") {
    order.push(["price", "DESC"]);
  } else if (sort === "rating_asc") {
    order.push(["rating", "ASC"]);
  } else if (sort === "rating_desc") {
    order.push(["rating", "DESC"]);
  }

  const products = await Product.findAndCountAll({
    where: whereClause,
    include: [
      {
        model: User,
        as: "seller",
        attributes: ["id", "name", "email"],
      },
      {
        model: Category,
        as: "category",
        attributes: ["id", "name"],
      },
    ],
    order,
    limit: parseInt(limit),
    offset,
  });

  const totalPages = Math.ceil(products.count / limit);

  res.status(200).json({
    success: true,
    products: products.rows,
    pagination: {
      currentPage: parseInt(page),
      totalPages,
      totalProducts: products.count,
    },
  });
});

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
};
