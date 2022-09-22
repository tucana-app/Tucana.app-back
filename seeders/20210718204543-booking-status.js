"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("BookingStatuses", [
      {
        code: "pending",
        name: "Pending",
      },
      {
        code: "seen",
        name: "Seen by the driver",
      },
      {
        code: "accepted",
        name: "Accepted",
      },
      {
        code: "refused",
        name: "Refused",
      },
      {
        code: "canceled",
        name: "Canceled",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("BookingStatuses", null, {});
  },
};
