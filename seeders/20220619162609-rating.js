"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Ratings", [
      {
        UserId: 1,
        passengerRating: 4.68,
        driverRating: 0,
        nbPassengerRating: 6,
        nbDriverRating: 0,
      },
      {
        UserId: 2,
        passengerRating: 0,
        driverRating: 4.96,
        nbPassengerRating: 0,
        nbDriverRating: 15,
      },
      {
        UserId: 3,
        passengerRating: 4.98,
        driverRating: 0,
        nbPassengerRating: 4,
        nbDriverRating: 0,
      },
      {
        UserId: 4,
        passengerRating: 5,
        driverRating: 4.56,
        nbPassengerRating: 10,
        nbDriverRating: 13,
      },
      {
        UserId: 5,
        passengerRating: 0,
        driverRating: 0,
        nbPassengerRating: 0,
        nbDriverRating: 0,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Ratings", {
      UserId: {
        [Sequelize.Op.in]: [1, 2, 3, 4, 5],
      },
    });
  },
};
