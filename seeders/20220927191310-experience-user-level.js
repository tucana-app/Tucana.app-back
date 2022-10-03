"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("ExperienceUserLevels", [
      {
        id: 1,
        min: 0,
        max: 25,
        rate: 1,
      },
      {
        id: 2,
        min: 26,
        max: 50,
        rate: 2,
      },
      {
        id: 3,
        min: 51,
        max: 100,
        rate: 3,
      },
      {
        id: 4,
        min: 101,
        max: 200,
        rate: 4,
      },
      {
        id: 5,
        min: 201,
        max: 300,
        rate: 5,
      },
      {
        id: 6,
        min: 301,
        max: 400,
        rate: 6,
      },
      {
        id: 7,
        min: 400,
        max: 501,
        rate: 7,
      },
      {
        id: 8,
        min: 501,
        max: 1000,
        rate: 8,
      },
      {
        id: 9,
        min: 1001,
        max: 2000,
        rate: 9,
      },
      {
        id: 10,
        min: 2001,
        max: 99999,
        rate: 10,
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
