const express = require("express");
const router = express.Router();
const { validateRegister, validateLogin } = require("../middleware/Validation");
const { register, login, logout } = require("../controller/Auth");

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/logout", logout);

module.exports = router;
