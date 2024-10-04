"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Reviews", "productId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Products",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Reviews", "userId");
    await queryInterface.removeColumn("Reviews", "productId");
  },
};
