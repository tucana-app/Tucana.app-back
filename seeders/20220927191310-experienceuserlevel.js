"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("ExperienceUserLevels", [
      {
        id: 1,
        min: 0,
        max: 25,
        rate: 1,
        code: "lvl_1",
        label: "Novice",
      },
      {
        id: 2,
        min: 26,
        max: 50,
        rate: 2,
        code: "lvl_2",
        label: "Apprentice",
      },
      {
        id: 3,
        min: 51,
        max: 100,
        rate: 3,
        code: "lvl_3",
        label: "Pathfinder",
      },
      {
        id: 4,
        min: 101,
        max: 150,
        rate: 4,
        code: "lvl_4",
        label: "Adventurer",
      },
      {
        id: 5,
        min: 151,
        max: 200,
        rate: 5,
        code: "lvl_5",
        label: "Expert",
      },
      {
        id: 6,
        min: 201,
        max: 300,
        rate: 6,
        code: "lvl_6",
        label: "Knight",
      },
      {
        id: 7,
        min: 301,
        max: 400,
        rate: 7,
        code: "lvl_7",
        label: "Hero",
      },
      {
        id: 8,
        min: 401,
        max: 500,
        rate: 8,
        code: "lvl_8",
        label: "Champion",
      },
      {
        id: 9,
        min: 501,
        max: 1000,
        rate: 9,
        code: "lvl_9",
        label: "Demigod",
      },
      {
        id: 10,
        min: 1001,
        max: 99999,
        rate: 10,
        code: "lvl_10",
        label: "Veteran",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ExperienceUserLevels", {
      id: {
        [Sequelize.Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
    });
  },
};
