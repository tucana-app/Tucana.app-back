"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("ExperienceUserLevels", [
      {
        id: 1,
        min: 0,
        max: 25,
        multiplier: 1,
      },
      {
        id: 2,
        min: 26,
        max: 100,
        multiplier: 1.25,
      },
      {
        id: 3,
        min: 101,
        max: 200,
        multiplier: 1.5,
      },
      {
        id: 4,
        min: 201,
        max: 300,
        multiplier: 1.75,
      },
      {
        id: 5,
        min: 301,
        max: 400,
        multiplier: 2,
      },
      {
        id: 6,
        min: 401,
        max: 500,
        multiplier: 2.5,
      },
      {
        id: 7,
        min: 500,
        max: 1000,
        multiplier: 3,
      },
      {
        id: 8,
        min: 1000,
        max: 2001,
        multiplier: 3.5,
      },
      {
        id: 9,
        min: 2001,
        max: 3000,
        multiplier: 4,
      },
      {
        id: 10,
        min: 3001,
        max: 99999,
        multiplier: 5,
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
