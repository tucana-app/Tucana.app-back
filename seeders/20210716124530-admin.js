"use strict";

const bcrypt = require("bcryptjs");
require("dotenv").config;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Admins", [
      {
        firstName: "Admin",
        lastName: "Tucána",
        username: "admin",
        email: "admin@tucana",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Admins", {
      id: {
        [Sequelize.Op.in]: [1],
      },
    });
  },
};
