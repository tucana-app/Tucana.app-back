"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Constants", [
      {
        key: "USER_VERSION",
        value: "1.0.0",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Constants", null, {});
  },
};
