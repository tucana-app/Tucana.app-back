"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("ExperienceUsers", [
      {
        UserId: 1,
        ExperienceUserLevelId: 4,
        points: 150,
      },
      {
        UserId: 2,
        ExperienceUserLevelId: 2,
        points: 38,
      },
      {
        UserId: 3,
        ExperienceUserLevelId: 6,
        points: 333,
      },
      {
        UserId: 4,
        ExperienceUserLevelId: 3,
        points: 59,
      },
      {
        UserId: 5,
        ExperienceUserLevelId: 1,
        points: 0,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ExperienceUsers", {
      UserId: {
        [Sequelize.Op.in]: [1, 2, 3, 4, 5],
      },
    });
  },
};
