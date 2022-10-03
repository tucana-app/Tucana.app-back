"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("BookingStatuses", "name"),
      queryInterface.removeColumn("RideStatuses", "name"),
      queryInterface.removeColumn("ExperienceUserLevels", "code"),
      queryInterface.removeColumn("ExperienceUserLevels", "label"),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return null;
  },
};
