const { Op } = require("sequelize");
const User = require("../database/Models/User");
const { getUserAttributes } = require("../database/PartialModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const path = require("path");

// Load Informasi Pelanggan ketika login
const loadUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findByPk(req.user.id, {
    attributes: getUserAttributes(),
  });

  if (!user) {
    return next(new ErrorHandler("User not found with this id", 404));
  }
  res.status(200).json({
    success: true,
    user: {
      name: user.name,
      email: user.email,
      avatar: user.avatar || "/images/avatars/default.png",
    },
  });
});

const updateCustomerInfo = catchAsyncError(async (req, res, next) => {
  const { name, email, address, phone } = req.body;
  const user = await User.findByPk(req.user.id, {
    attributes: getUserAttributes(),
  });

  if (!user) {
    return next(new ErrorHandler("User not found with this id", 404));
  }

  if (name) user.name = name;
  if (email) user.email = email;
  if (address) {
    user.address = address;
  } else {
    user.address = null;
  }
  if (phone) {
    user.phone = phone;
  } else {
    user.phone = null;
  }

  if (req.file) {
    const newAvatar = `images/avatars/${req.file.filename}`;

    if (user.avatar && user.avatar !== "images/avatars/default.jpg") {
      fs.unlink(path.join(__dirname, `../${user.avatar}`), (err) => {
        if (err) console.error(err);
      });
    }

    user.avatar = newAvatar;
  }
  console.log("Before save");
  await user.save({ returning: true });
  console.log("After save", user.toJSON());

  res
    .status(200)
    .json({ success: true, message: "User Updated Successfully", user });
});

// Get Single Customer
const getSingleCustomer = catchAsyncError(async (req, res, next) => {
  const user = await User.findByPk(req.params.id, {
    attributes: getUserAttributes(),
  });
  if (!user) {
    return next(new ErrorHandler("User not found with this id", 404));
  }
  res.status(200).json({ success: true, user });
});

// For Admin Only
const getAllCustomer = catchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;

  const status = req.query.status || null;
  const search = req.query.search || "";

  const sortBy = req.query.sortBy || "id";
  const order = req.query.order || "ASC";

  let whereClause = {};
  if (status) {
    whereClause.status = status;
  }

  if (search) {
    whereClause[Op.or] = [
      {
        name: { [Op.like]: `%${search}%` },
      },
      { email: { [Op.like]: `%${search}%` } },
    ];
  }
  const users = await User.findAndCountAll({
    where: whereClause,
    limit: limit,
    offset: offset,
    order: [[sortBy, order]],
    attributes: getUserAttributes(),
  });

  if (!users.rows.length) {
    return next(new ErrorHandler("There are no user", 404));
  }

  res.status(200).json({
    success: true,
    count: users.count,
    totalPages: Math.ceil(users.count / limit),
    currentPage: page,
    users: users.rows,
  });
});

const deleteUsers = catchAsyncError(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found with this id", 404));
  }

  await user.destroy();
  res.status(200).json({ success: true, message: "User Deleted Successfully" });
});
module.exports = {
  loadUser,
  updateCustomerInfo,
  getSingleCustomer,
  getAllCustomer,
  deleteUsers,
};
