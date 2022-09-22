"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Bookings", [
      // Booking #1
      {
        DriverId: 4,
        UserId: 2,
        RideId: 6,
        seatsBooked: 1,
        BookingStatusId: 3,
        totalPaidPassenger: 5000,
        totalReceivedDriver: 4000,
      },
      // Booking #2
      {
        DriverId: 1,
        UserId: 3,
        RideId: 4,
        seatsBooked: 2,
        BookingStatusId: 1,
        totalPaidPassenger: 6000,
        totalReceivedDriver: 5000,
      },
      // Booking #3
      {
        DriverId: 2,
        UserId: 1,
        RideId: 9,
        seatsBooked: 3,
        BookingStatusId: 1,
        totalPaidPassenger: 7000,
        totalReceivedDriver: 6000,
      },
      // Booking #4
      {
        DriverId: 3,
        UserId: 1,
        RideId: 8,
        seatsBooked: 3,
        BookingStatusId: 3,
        totalPaidPassenger: 8000,
        totalReceivedDriver: 7000,
      },
      // Booking #5
      {
        DriverId: 3,
        UserId: 4,
        RideId: 1,
        seatsBooked: 1,
        BookingStatusId: 4,
        totalPaidPassenger: 9000,
        totalReceivedDriver: 8000,
      },
      // Booking #6
      {
        DriverId: 2,
        UserId: 4,
        RideId: 5,
        seatsBooked: 2,
        BookingStatusId: 1,
        totalPaidPassenger: 10000,
        totalReceivedDriver: 9000,
      },
      // Booking #7
      {
        DriverId: 2,
        UserId: 1,
        RideId: 7,
        seatsBooked: 1,
        BookingStatusId: 3,
        totalPaidPassenger: 11000,
        totalReceivedDriver: 10000,
      },
      // Booking #8
      {
        DriverId: 4,
        UserId: 3,
        RideId: 2,
        seatsBooked: 5,
        BookingStatusId: 4,
        totalPaidPassenger: 12000,
        totalReceivedDriver: 11000,
      },
      // Booking #9
      {
        DriverId: 4,
        UserId: 3,
        RideId: 6,
        seatsBooked: 1,
        BookingStatusId: 1,
        totalPaidPassenger: 13000,
        totalReceivedDriver: 12000,
      },
      // Booking #10
      {
        DriverId: 1,
        UserId: 2,
        RideId: 3,
        seatsBooked: 2,
        BookingStatusId: 3,
        totalPaidPassenger: 14000,
        totalReceivedDriver: 13000,
      },
      // Booking #11
      {
        DriverId: 2,
        UserId: 1,
        RideId: 5,
        seatsBooked: 2,
        BookingStatusId: 1,
        totalPaidPassenger: 15000,
        totalReceivedDriver: 14000,
      },
      // Booking #12
      {
        DriverId: 3,
        UserId: 2,
        RideId: 1,
        seatsBooked: 1,
        BookingStatusId: 1,
        totalPaidPassenger: 16000,
        totalReceivedDriver: 15000,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Bookings", {
      id: {
        [Sequelize.Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },
    });
  },
};
