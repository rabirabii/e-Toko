"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "avatar", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "images/avatars/default.png",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "avatar");
  },
};
