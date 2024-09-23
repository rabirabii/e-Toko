const User = require("../database/Models/User");
const ErrorHandler = require("../utils/ErrorHandler");
const { JWT_SECRET } = require("../utils/jwt_secret");
const catchAsyncError = require("./catchAsyncError");

const isAuth = catchAsyncError(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new ErrorHandler("Login to access this resource", 401));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = await User.findByPk(decoded.id);
    if (!req.user) {
      return next(new ErrorHandler("User not found with this id", 404));
    }
    next();
  } catch (error) {
    return next(
      new ErrorHandler("Not Authorized to access this resource", 401)
    );
  }
});
const Authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler("Not Authorized to access this resource", 403)
      );
    }
  };
};

module.exports = { isAuth, Authorize };
