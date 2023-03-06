"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("admins_roles", [
      {
        AdminId: 1,
        RoleId: 1,
      },
      {
        AdminId: 1,
        RoleId: 2,
      },
      {
        AdminId: 1,
        RoleId: 3,
      },
      {
        AdminId: 1,
        RoleId: 4,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("admins_roles", {
      AdminId: {
        [Sequelize.Op.in]: [1],
      },
    });
  },
};
