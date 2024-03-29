"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Conversations", [
      {
        DriverId: 4,
        UserId: 2,
        RideId: 6,
        archived: false,
        UUID: uuidv4(),
      },
      {
        DriverId: 3,
        UserId: 2,
        RideId: 1,
        archived: false,
        UUID: uuidv4(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Conversations", {
      id: {
        [Sequelize.Op.in]: [1, 2],
      },
    });
  },
};
