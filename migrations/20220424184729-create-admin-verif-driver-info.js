"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("admin_VerifDriverInfos", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      AdminId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      DriverInfoId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      accepted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      comment: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("admin_VerifDriverInfos");
  },
};
