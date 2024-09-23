const jwt = require("jsonwebtoken");
const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../database/Models/User");
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const isAuth = catchAsyncError(async (req, res, next) => {
  let token;

  console.log("Authorization Header: ", req.headers.authorization);
  console.log("Cookies", req.cookies);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log("Token from Auth Header :", token);
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
    console.log("Token from Cookies :", token);
  }

  if (!token) {
    console.log("No Token Found");
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  const decoded = jwt.verify(token, JWT_SECRET);
  console.log("Token Decoded Succesfully:", decoded);

  req.user = await User.findByPk(decoded.id);
  if (!req.user) {
    console.log("User Not Found", decoded.id);
    return next(new ErrorHandler("User not Found ", 404));
  }

  req.user.role = decoded.role;
  console.log("User role from Token: ", decoded.role);

  next();
});

const Authorize = (...roles) => {
  return (req, res, next) => {
    console.log("Authorized Roles: ", roles);
    console.log("User Role", req.user.role);

    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

module.exports = { isAuth, Authorize };
