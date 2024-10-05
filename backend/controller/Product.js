const { Op, Sequelize } = require("sequelize");
const { User, Category, Product, Review } = require("../database");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const { parse } = require("dotenv");

// Create A Product
const createProduct = catchAsyncError(async (req, res, next) => {
  const { name, description, price, categoryId, quantity } = req.body;

  const seller = req.user.id;
  console.log("Seller ID:", seller);
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
    sellerId: seller,
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

  // Filter by category
  if (category) {
    const categoryRecord = await Category.findOne({
      where: { name: category },
    });
    if (categoryRecord) {
      whereClause.categoryId = categoryRecord.id;
    }
  }

  // Filter by price range
  if (price) {
    const priceRange = price.split("-");
    if (priceRange.length === 2) {
      whereClause.price = {
        [Op.between]: [parseFloat(priceRange[0]), parseFloat(priceRange[1])],
      };
    }
  }

  // Search by product name
  if (search) {
    whereClause.name = {
      [Op.iLike]: `%${search}%`,
    };
  }

  // Parse rating parameter
  let minRating, maxRating;

  if (rating) {
    const ratingParts = rating.split("-");
    if (ratingParts.length === 2) {
      // Rentang rating
      minRating = parseFloat(ratingParts[0]);
      maxRating = parseFloat(ratingParts[1]);
    } else {
      // Hanya satu nilai rating
      minRating = parseFloat(rating);
      maxRating = 5;
    }
  } else {
    minRating = 0;
    maxRating = 5;
  }

  // Fetch products with rating filter
  const products = await Product.findAll({
    where: whereClause,
    include: [
      {
        model: User,
        as: "seller",
        attributes: ["id", "name"],
      },
      {
        model: Category,
        as: "category",
        attributes: ["id", "name"],
      },
      {
        model: Review,
        as: "reviews",
        attributes: [],
      },
    ],
    attributes: {
      include: [
        [Sequelize.fn("AVG", Sequelize.col("reviews.rating")), "averageRating"],
        [Sequelize.fn("COUNT", Sequelize.col("reviews.id")), "reviewCount"],
      ],
    },
    group: ["Products.id", "seller.id", "category.id"],
    having: Sequelize.where(
      Sequelize.fn("AVG", Sequelize.col("reviews.rating")),
      {
        [Op.between]: [minRating, maxRating],
      }
    ),
    order: sort ? [[getSortOrder(sort)]] : [],
    limit: parseInt(limit),
    offset,
    subQuery: false,
  });

  // Pagination information
  const totalProducts = await Product.count({ where: whereClause });
  const totalPages = Math.ceil(totalProducts / limit);

  res.status(200).json({
    success: true,
    products,
    pagination: {
      currentPage: parseInt(page),
      totalPages,
      totalProducts,
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
