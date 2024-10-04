"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Tambahkan constraint unique ke kolom name
    await queryInterface.changeColumn("Categories", "name", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Kembalikan perubahan dengan menghapus constraint unique
    await queryInterface.changeColumn("Categories", "name", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    });
  },
};
