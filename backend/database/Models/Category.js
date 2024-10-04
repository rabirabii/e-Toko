const { DataTypes } = require("sequelize");
const Sequalize = require("../db");
const Product = require("./Product");

const Category = Sequalize.define("Categories", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

module.exports = Category;
