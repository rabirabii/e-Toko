"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Reviews", [
      {
        rating: 5,
        comment: "Great product!",
        userId: 1,
        productId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rating: 4,
        comment: "Good value for money.",
        userId: 1,
        productId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reviews", null, {});
  },
};
