const { check } = require("express-validator");

// Register
exports.validateRegister = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Email is required").isEmail(),
  check("password", "Password should be at least 6 characters").isLength({
    min: 6,
    max: 24,
  }),
];

exports.validateLogin = [
  check("email", "Please Enter a Valid Email").isEmail(),
  check("password", "Password is required").not().isEmpty(),
];
