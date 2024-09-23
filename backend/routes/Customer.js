const express = require("express");
const {
  loadUser,
  updateCustomerInfo,
  getSingleCustomer,
  getAllCustomer,
  deleteUsers,
} = require("../controller/Customer");
const { isAuth, Authorize } = require("../middleware/Protected");
const router = express.Router();

// Customer Route
router.get("/load-user", isAuth, Authorize("customer"), loadUser);
router.put("/update-info", isAuth, Authorize("customer"), updateCustomerInfo);
router.get(
  "/customer-info/:id",

  getSingleCustomer
);
router.get("/customers", isAuth, getAllCustomer);
router.delete("/delete-user/:id", isAuth, deleteUsers);
module.exports = router;
