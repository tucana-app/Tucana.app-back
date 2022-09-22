"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Drivers", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      idType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idCountry: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      licenseNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      licenseCountry: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Drivers");
  },
};
