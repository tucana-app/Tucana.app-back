"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Drivers", [
      {
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Drivers", {
      UserId: {
        [Sequelize.Op.in]: [1, 2, 3, 4],
      },
    });
  },
};
