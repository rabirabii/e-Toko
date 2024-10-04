"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Categories", [
      {
        name: "Electronics",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Fashion",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Home & Garden",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
