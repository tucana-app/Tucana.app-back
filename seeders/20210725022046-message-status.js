"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("MessageStatuses", [
      {
        code: "sent",
        name: "Sent",
      },
      {
        code: "received",
        name: "Received",
      },
      {
        code: "seen",
        name: "Seen",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("MessageStatuses", {});
  },
};
