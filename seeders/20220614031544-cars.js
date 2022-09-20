"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Cars", [
      {
        DriverId: 1,
        maker: "Toyota",
        numberPlate: "112233",
        riteve: JSON.stringify({
          year: "2024",
          month: "3",
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        DriverId: 2,
        maker: "Hyundai",
        numberPlate: "BCN260",
        riteve: JSON.stringify({
          year: "2023",
          month: "4",
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        DriverId: 3,
        maker: "Renault",
        numberPlate: "AAA333",
        riteve: JSON.stringify({
          year: "2021",
          month: "1",
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        DriverId: 4,
        maker: "Suzuki",
        numberPlate: "BBB999",
        riteve: JSON.stringify({
          year: "2025",
          month: "2",
        }),
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
