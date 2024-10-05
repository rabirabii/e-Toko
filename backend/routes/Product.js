const express = require("express");
const { isAuth, Authorize } = require("../middleware/Protected");
const {
  createProduct,
  updateProduct,
  getProductById,
  getAllProducts,
  deleteProduct,
} = require("../controller/Product");

const router = express.Router();

// Product Route
router.post("/add-product", isAuth, Authorize("seller"), createProduct);
router.put("/update-product/:id", isAuth, Authorize("seller"), updateProduct);
router.get("/product/:id", getProductById);
router.get("/products", getAllProducts);
router.delete(
  "/delete-product/:id",
  isAuth,
  Authorize("seller"),
  deleteProduct
);
module.exports = router;
