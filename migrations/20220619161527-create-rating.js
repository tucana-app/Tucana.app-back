"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Ratings", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      passengerRating: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: false,
      },
      driverRating: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: false,
      },
      nbPassengerRating: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      nbDriverRating: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
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
    await queryInterface.dropTable("Ratings");
  },
};
