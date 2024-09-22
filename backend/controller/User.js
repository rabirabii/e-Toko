const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");

exports.register = catchAsyncError(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return next(new ErrorHandler("User Already Exists", 400));
    }
  } catch (error) {}
});
