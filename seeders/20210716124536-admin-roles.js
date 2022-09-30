"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("admins_roles", [
      {
        // adminId: 1 = Administrator
        adminId: 1,
        roleId: 1,
      },
      {
        adminId: 1,
        roleId: 2,
      },
      {
        adminId: 1,
        roleId: 3,
      },
      {
        adminId: 1,
        roleId: 4,
      },
      {
        // adminId: 2 = Moderator
        adminId: 2,
        roleId: 2,
      },
      {
        // adminId: 3 = Support
        adminId: 3,
        roleId: 3,
      },
      {
        // adminId: 4 = Sales
        adminId: 4,
        roleId: 4,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("admins_roles", {
      adminId: {
        // adminId: 1 = Administrator
        // adminId: 2 = Moderator
        // adminId: 3 = Support
        // adminId: 4 = Sales
        [Sequelize.Op.in]: [1, 2, 3, 4],
      },
    });
  },
};
