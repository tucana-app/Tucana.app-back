"use strict";

const bcrypt = require("bcryptjs");
require("dotenv").config;
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "José",
        lastName: "Palmer",
        username: "jose",
        email: "info@tucana.app",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
        phoneNumber: "+50625213256",
        createdAt: new Date(),
        updatedAt: new Date(),
        emailConfirmed: true,
        phoneConfirmed: false,
        avatar: "toucan",
      },
      {
        firstName: "Alex",
        lastName: "Hernandez",
        username: "alex",
        email: "benjamin.jaume@gmail.com",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
        phoneNumber: "+33605040302",
        createdAt: new Date(),
        updatedAt: new Date(),
        emailConfirmed: true,
        phoneConfirmed: false,
        firstSetUp: false,
        avatar: "sloth",
      },
      {
        firstName: "Peter",
        lastName: "Mountain",
        username: "peter",
        email: "jorustyron@outlook.com",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
        phoneNumber: "+50680706050",
        createdAt: new Date(),
        updatedAt: new Date(),
        emailConfirmed: true,
        phoneConfirmed: false,
        firstSetUp: false,
        avatar: "toucan",
      },
      {
        firstName: "Gabriel",
        lastName: "Matera",
        username: "gab",
        email: "jorustyron@gmail.com",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
        phoneNumber: "+50687956231",
        createdAt: new Date(),
        updatedAt: new Date(),
        emailConfirmed: true,
        phoneConfirmed: false,
        firstSetUp: false,
        avatar: "dolphin",
      },
      {
        firstName: "Benjamin",
        lastName: "Tyron",
        username: "ben",
        email: "ride.cr.app@gmail.com",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
        phoneNumber: "+33607897833",
        createdAt: new Date(),
        updatedAt: new Date(),
        emailConfirmed: true,
        phoneConfirmed: false,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", {
      username: {
        [Sequelize.Op.in]: ["jose", "alex", "peter", "gab", "ben"],
      },
    });
  },
};
