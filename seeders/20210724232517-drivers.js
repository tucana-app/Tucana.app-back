"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Drivers", [
      {
        UserId: 1,
        idType: "Passport",
        idNumber: "11223344",
        idCountry: "France",
        licenseNumber: "11223344",
        licenseCountry: "France",
      },
      {
        UserId: 2,
        idType: "Passport",
        idNumber: "22334455",
        idCountry: "Costa Rica",
        licenseNumber: "22334455",
        licenseCountry: "Costa Rica",
      },
      {
        UserId: 3,
        idType: "Passport",
        idNumber: "33445566",
        idCountry: "United Sates of America",
        licenseNumber: "33445566",
        licenseCountry: "United Sates of America",
      },
      {
        UserId: 4,
        idType: "Passport",
        idNumber: "44556677",
        idCountry: "France",
        licenseNumber: "44556677",
        licenseCountry: "France",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Drivers", {
      UserId: {
        [Sequelize.Op.in]: [1, 2, 3, 4],
      },
    });
  },
};
