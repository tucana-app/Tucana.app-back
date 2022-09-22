"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("RideFeedbacks", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      UserId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      RideId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      BookingId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      DriverId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      isConfirmed: {
        type: Sequelize.BOOLEAN,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("RideFeedbacks");
  },
};
