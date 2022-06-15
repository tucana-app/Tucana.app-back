"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Users", "driverRating", {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: false,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Users", "driverRating", {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: false,
      }),
    ]);
  },
};
