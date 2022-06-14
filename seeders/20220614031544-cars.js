"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Cars", [
      {
        DriverId: 1,
        maker: "Toyota",
        numberPlate: "112233",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        DriverId: 2,
        maker: "Hyundai",
        numberPlate: "BCN260",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        DriverId: 3,
        maker: "Renault",
        numberPlate: "AAA333",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        DriverId: 4,
        maker: "Suzuki",
        numberPlate: "BBB999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Cars", {
      DriverId: {
        [Sequelize.Op.in]: [1, 2, 3, 4],
      },
    });
  },
};
