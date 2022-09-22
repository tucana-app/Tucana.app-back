"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("admin_VerifPassengerRatings", {
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
      PassengerRatingId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      isAccepted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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
    await queryInterface.dropTable("admin_VerifPassengerRatings");
  },
};
