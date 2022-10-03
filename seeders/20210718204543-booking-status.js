"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("BookingStatuses", [
      {
        code: "pending",
      },
      {
        code: "seen",
      },
      {
        code: "accepted",
      },
      {
        code: "refused",
      },
      {
        code: "canceled",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("BookingStatuses", null, {});
  },
};
