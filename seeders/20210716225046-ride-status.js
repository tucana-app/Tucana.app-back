"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("RideStatuses", [
      {
        code: "planned",
        name: "Planned",
      },
      {
        code: "on_going",
        name: "On going",
      },
      {
        code: "done",
        name: "Done",
      },
      {
        code: "canceled",
        name: "Canceled",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("RideStatuses", null, {});
  },
};
