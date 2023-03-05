"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn("Roles", "name", "code"),
      queryInterface.renameColumn("admins_roles", "adminId", "AdminId"),
      queryInterface.renameColumn("admins_roles", "roleId", "RoleId"),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn("Roles", "code", "name"),
      queryInterface.renameColumn("admins_roles", "AdminId", "adminId"),
      queryInterface.renameColumn("admins_roles", "RoleId", "roleId"),
    ]);
  },
};
