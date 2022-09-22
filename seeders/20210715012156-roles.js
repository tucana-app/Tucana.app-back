"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Roles", [
      {
        name: "admin",
      },
      {
        name: "moderator",
      },
      {
        name: "support",
      },
      {
        name: "sales",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Roles", null, {});
  },
};
