"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("admins_roles", [
      {
        // AdminId: 1 = Administrator
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
      {
        // AdminId: 2 = Moderator
        AdminId: 2,
        RoleId: 2,
      },
      {
        // AdminId: 3 = Support
        AdminId: 3,
        RoleId: 3,
      },
      {
        // AdminId: 4 = Sales
        AdminId: 4,
        RoleId: 4,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("admins_roles", {
      AdminId: {
        // AdminId: 1 = Administrator
        // AdminId: 2 = Moderator
        // AdminId: 3 = Support
        // AdminId: 4 = Sales
        [Sequelize.Op.in]: [1, 2, 3, 4],
      },
    });
  },
};
