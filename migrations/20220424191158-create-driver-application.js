"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DriverApplications", {
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
      idType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idCountry: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      licenseNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      licenseCountry: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      carMaker: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      carModel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      numberPlate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      carYear: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      carColor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      carMarchamo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      carRiteve: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("DriverApplications");
  },
};
