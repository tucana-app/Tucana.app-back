"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Constants", [
      {
        key: "USER_VERSION",
        value: "1.0.0",
      },
      {
        key: "PRICE_MIN",
        value: 2000,
      },
      {
        key: "PRICE_MAX",
        value: 50000,
      },
      {
        key: "SEATS_MAX",
        value: "3",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Constants", null, {});
  },
};
