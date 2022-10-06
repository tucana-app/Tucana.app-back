"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Constants", [
      {
        key: "USER_VERSION",
        value: "1.0.0",
      },
      {
        key: "PRICE_MIN",
        value: 2000,
      },
      {
        key: "PRICE_MAX",
        value: 50000,
      },
      {
        key: "COMMISSION",
        value: 1,
      },
      {
        key: "CAR_MAKERS",
        value: JSON.stringify([
          "Other",
          "Audi",
          "BMW",
          "Chevrolet",
          "Chrysler",
          "Citroën",
          "Daewoo",
          "Daihatsu",
          "Datsun",
          "Dodge",
          "Ford",
          "GMC",
          "Geely",
          "Honda",
          "Hyundai",
          "Jeep",
          "Kia",
          "Land Rover",
          "Mazda",
          "Mercedes-Benz",
          "Mitsubishi",
          "Nissan",
          "Peugeot",
          "Porsche",
          "RAM",
          "Renault",
          "Ssangyong",
          "Subaru",
          "Suzuki",
          "Toyota",
          "Volkswagen",
          "Volvo",
        ]),
      },
      {
        key: "SEATS_MAX",
        value: "3",
      },
      {
        key: "CONTACT_SUBJECTS",
        value: JSON.stringify([
          "Account",
          "Booking",
          "Ride",
          "Investment",
          "Donation",
          "App feedback",
          "Report someone",
          "Work with us",
          "Close my account",
          "Other",
        ]),
      },
      {
        key: "EXPERIENCE_POINTS_GRID",
        value: JSON.stringify({
          READ_MESSAGE: {
            label: "Read a message",
            value: 1,
          },
          SEND_MESSAGE: {
            label: "Send a message",
            value: 2,
          },
          ADD_BIO: {
            label: "Add your bio",
            value: 15,
          },
          UPDATE_BIO: {
            label: "Update your bio",
            value: 5,
          },
          BOOK_RIDE: {
            label: "Book a ride",
            value: 10,
          },
          PUBLISH_RIDE: {
            label: "Publish a ride",
            value: 20,
          },
          ANSWER_BOOKING: {
            label: "Answer a booking",
            value: 10,
          },
          BECOME_DRIVER: {
            label: "Become a driver",
            value: 20,
          },
          ADD_REVIEW: {
            label: "Add a rewiew",
            value: 10,
          },
          CONFIRM_RIDE: {
            label: "Complete a ride",
            value: 10,
          },
          ADD_DATE_OF_BIRTH: {
            label: "Add your date of birth",
            value: 15,
          },
          SET_CAR_FUEL: {
            label: "Set your car's fuel type",
            value: 2,
          },
          SET_CAR_SEATS: {
            label: "Set your car's seat number",
            value: 2,
          },
        }),
      },
      {
        key: "MONTHS",
        value: JSON.stringify({
          1: "01-January",
          2: "02-February",
          3: "03-March",
          4: "04-April",
          5: "05-May",
          6: "06-June",
          7: "07-July",
          8: "08-August",
          9: "09-September",
          10: "10-October",
          11: "11-November",
          12: "12-December",
        }),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Constants", null, {});
  },
};
