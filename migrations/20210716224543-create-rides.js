"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Rides", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      DriverId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      origin: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      destination: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      dateTimeOrigin: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dateTimeDestination: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      ETA: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      seatsAvailable: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      seatsLeft: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      comment: {
        type: Sequelize.STRING,
      },
      RideStatusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
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
    await queryInterface.dropTable("Rides");
  },
};
