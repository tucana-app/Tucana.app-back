"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn("Users", "firstSetUp")]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("Users", "firstSetUp", {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      }),
    ]);
  },
};
