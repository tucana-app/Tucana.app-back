"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Conversations", {
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
      UUID: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      archived: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable("Conversations");
  },
};
