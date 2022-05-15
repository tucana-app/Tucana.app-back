"use strict";

const bcrypt = require("bcryptjs");
require("dotenv").config;
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        id: 1,
        firstName: "Valentin",
        lastName: "Palmer",
        username: "val",
        email: "info@tucana.app",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
        phoneNumber: "+50625213256",
        createdAt: new Date(),
        updatedAt: new Date(),
        emailConfirmed: true,
        phoneConfirmed: false,
      },
      {
        id: 2,
        firstName: "Damien",
        lastName: "Roufre",
        username: "damien",
        email: "benjamin.jaume@gmail.com",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
        phoneNumber: "0605040302",
        createdAt: new Date(),
        updatedAt: new Date(),
        emailConfirmed: true,
        phoneConfirmed: false,
      },
      {
        id: 3,
        firstName: "Peter",
        lastName: "Furniture",
        username: "peter",
        email: "admin@tucana.app",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
        phoneNumber: "0807060504",
        createdAt: new Date(),
        updatedAt: new Date(),
        emailConfirmed: true,
        phoneConfirmed: false,
      },
      {
        id: 4,
        firstName: "Alan",
        lastName: "Matera",
        username: "alan",
        email: "jorustyron@gmail.com",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
        phoneNumber: "87956231",
        createdAt: new Date(),
        updatedAt: new Date(),
        emailConfirmed: true,
        phoneConfirmed: false,
      },
      {
        id: 5,
        firstName: "Ben",
        lastName: "Jamin",
        username: "ben",
        email: "ben@tucana.app",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
        phoneNumber: "87907000",
        createdAt: new Date(),
        updatedAt: new Date(),
        emailConfirmed: true,
        phoneConfirmed: false,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", {
      id: {
        [Sequelize.Op.in]: [1, 2, 3, 4, 5],
      },
    });
  },
};
