"use strict";

const bcrypt = require("bcryptjs");
require("dotenv").config;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Admins", [
      {
        id: 1,
        firstName: process.env.ADMIN_FIRSTNAME,
        lastName: process.env.ADMIN_LASTNAME,
        username: process.env.ADMIN_USERNAME,
        email: process.env.ADMIN_EMAIL,
        password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        firstName: process.env.MODO_FIRSTNAME,
        lastName: process.env.MODO_LASTNAME,
        username: process.env.MODO_USERNAME,
        email: process.env.MODO_EMAIL,
        password: bcrypt.hashSync(process.env.MODO_PASSWORD, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        firstName: process.env.SUPPORT_FIRSTNAME,
        lastName: process.env.SUPPORT_LASTNAME,
        username: process.env.SUPPORT_USERNAME,
        email: process.env.SUPPORT_EMAIL,
        password: bcrypt.hashSync(process.env.SUPPORT_PASSWORD, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        firstName: process.env.SALES_FIRSTNAME,
        lastName: process.env.SALES_LASTNAME,
        username: process.env.SALES_USERNAME,
        email: process.env.SALES_EMAIL,
        password: bcrypt.hashSync(process.env.SALES_PASSWORD, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Admins", {
      id: {
        [Sequelize.Op.in]: [1, 2, 3, 4],
      },
    });
  },
};
