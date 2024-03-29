"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Messages", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      SenderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      ReceiverId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      body: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ConversationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      MessageStatusId: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Messages");
  },
};
