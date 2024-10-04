"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", [
      {
        name: "Smartphone XYZ",
        description: "High-end smartphone with excellent camera.",
        price: 699.99,
        quantity: 50,
        images: ["image1.png", "image2.png"],
        categoryId: 11,
        sellerId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Leather Jacket",
        description: "Stylish leather jacket for winter.",
        price: 149.99,
        quantity: 30,
        images: ["jacket.png"],
        categoryId: 12,
        sellerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
