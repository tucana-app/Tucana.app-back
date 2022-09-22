"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("emailReminderRatings", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      BookingId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
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
    await queryInterface.dropTable("emailReminderRatings");
  },
};
