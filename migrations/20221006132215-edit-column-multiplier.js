"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("ExperienceUserLevels", "multiplier", {
        type: Sequelize.FLOAT,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("ExperienceUserLevels", "multiplier", {
        type: Sequelize.INTEGER,
      }),
    ]);
  },
};
