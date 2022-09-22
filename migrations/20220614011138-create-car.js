"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Cars", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      DriverId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      maker: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      model: {
        type: Sequelize.STRING,
      },
      numberPlate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      year: {
        type: Sequelize.INTEGER,
      },
      color: {
        type: Sequelize.STRING,
      },
      color: {
        type: Sequelize.STRING,
      },
      marchamo: {
        type: Sequelize.INTEGER,
      },
      riteve: {
        type: Sequelize.JSONB,
      },
      photo: {
        type: Sequelize.STRING,
      },
      seats: {
        type: Sequelize.INTEGER,
      },
      fuelType: {
        type: Sequelize.STRING,
      },
      comment: {
        type: Sequelize.STRING,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Cars");
  },
};
