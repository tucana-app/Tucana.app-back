"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("RideStatuses", [
      {
        code: "planned",
      },
      {
        code: "on_going",
      },
      {
        code: "done",
      },
      {
        code: "canceled",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("RideStatuses", null, {});
  },
};
