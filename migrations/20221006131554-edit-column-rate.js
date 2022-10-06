"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn("ExperienceUserLevels", "rate", "multiplier"),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn("ExperienceUserLevels", "multiplier", "rate"),
    ]);
  },
};
