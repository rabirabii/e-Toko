const Sequelize = require("sequelize");
const sequelize = require("./db");
const User = require("./Models/User");
const Product = require("./Models/Product");
const Category = require("./Models/Category");
const Review = require("./Models/Review");

User.hasMany(Product, {
  foreignKey: "sellerId",
  as: "products",
});
Product.belongsTo(User, {
  foreignKey: "sellerId",
  as: "seller",
});
Product.hasMany(Review, {
  foreignKey: "productId",
  as: "reviews",
});

Category.hasMany(Product, {
  foreignKey: "categoryId",
  as: "products",
});
Product.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

User.hasMany(Review, { foreignKey: "userId", as: "reviews" });
Review.belongsTo(User, { foreignKey: "userId", as: "user" });
Review.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});
module.exports = { User, Product, Category, Review, sequelize };
