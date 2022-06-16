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
        passengerRating: 4.68,
        driverRating: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        emailConfirmed: true,
        phoneConfirmed: false,
      },
      {
        firstName: "Alex",
        lastName: "Hernandez",
        username: "alex",
        email: "benjamin.jaume@gmail.com",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
        phoneNumber: "+33605040302",
        passengerRating: 0,
        driverRating: 4.96,
        createdAt: new Date(),
        updatedAt: new Date(),
        emailConfirmed: true,
        phoneConfirmed: false,
      },
      {
        firstName: "Peter",
        lastName: "Mountain",
        username: "peter",
        email: "jorustyron@outlook.com",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
        phoneNumber: "+50680706050",
        passengerRating: 4.98,
        driverRating: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        emailConfirmed: true,
        phoneConfirmed: false,
      },
      {
        firstName: "Gabriel",
        lastName: "Matera",
        username: "gab",
        email: "jorustyron@gmail.com",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
        phoneNumber: "+50687956231",
        passengerRating: 5,
        driverRating: 4.56,
        createdAt: new Date(),
        updatedAt: new Date(),
        emailConfirmed: true,
        phoneConfirmed: false,
      },
      {
        firstName: "Benjamin",
        lastName: "Tyron",
        username: "ben",
        email: "ride.cr.app@gmail.com",
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
        phoneNumber: "+33607897833",
        passengerRating: 0,
        driverRating: 0,
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
