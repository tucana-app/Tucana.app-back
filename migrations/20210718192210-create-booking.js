"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Bookings", {
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
      UserId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      RideId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      BookingStatusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      seatsBooked: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalPaidPassenger: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalReceivedDriver: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      commentPassenger: {
        type: Sequelize.STRING,
      },
      commentDriver: {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Bookings");
  },
};
