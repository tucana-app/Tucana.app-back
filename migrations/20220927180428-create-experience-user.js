"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ExperienceUsers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      ExperienceUserLevelId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        defaultValue: 1,
      },
      points: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      currentFilter: {
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
    await queryInterface.dropTable("ExperienceUsers");
  },
};
