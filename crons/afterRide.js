const path = require("path");
const fileName = path.basename(__filename);

const db = require("../models");
const User = db.User;
const Driver = db.Driver;
const Ride = db.Ride;
const Op = db.Sequelize.Op;

// Not in use yet
const emailController = require("../controllers/email.controller");
const emailTemplates = require("../controllers/EmailTemplates");
const PassengerRating = db.PassengerRating;
const DriverRating = db.DriverRating;
const Booking = db.Booking;
const emailReminderRating = db.emailReminderRating;

const { consoleError, consoleCronStop } = require("../controllers/helpers");

// Function
module.exports = async function afterRide() {
  const promise = await Ride.findAll({
    where: {
      dateTimeOrigin: {
        [Op.lt]: new Date(),
      },
      // If the ride is NOT "Done" or greater
      RideStatusId: {
        [Op.lt]: 3,
      },
    },
  })
    .then((rides) => {
      // console.log(rides);

      if (rides) {
        // Mapping through the rides we found
        rides.map((ride) => {
          // We update the ride to "Done"
          Ride.update(
            {
              RideStatusId: 3,
            },
            {
              where: {
                id: ride.id,
              },
            }
          ).catch((error) => {
            // An error occured
            consoleError(fileName, arguments.callee.name, Error().stack, error);
          });

          // If no booking were made on the ride
          if (ride.seatsAvailable !== ride.seatsLeft) {
            // The ride has had bookings, next step is to get the accepted booking (3)
            return Booking.findAll({
              where: {
                RideId: ride.id,
                BookingStatusId: 3,
              },
            })
              .then((bookings) => {
                // console.log(bookings);

                // If no bookings, a problem happens
                if (!bookings) {
                  consoleError(
                    fileName,
                    arguments.callee.name,
                    Error().stack,
                    "No bookings found"
                  );
                } else {
                  bookings.map((booking) => {
                    // First, the passenger's rating
                    PassengerRating.findOne({
                      where: {
                        BookingId: booking.id,
                        RideId: booking.RideId,
                        UserId: booking.UserId,
                      },
                    })
                      .then((passengerRating) => {
                        // If there is no passenger's rating yet
                        if (passengerRating) {
                          // The passenger has rated already
                        } else {
                          // Check if we already have sent an email
                          return emailReminderRating
                            .findOne({
                              where: {
                                UserId: booking.UserId,
                                RideId: booking.RideId,
                                BookingId: booking.id,
                              },
                            })
                            .then((reminder) => {
                              if (!reminder) {
                                // The reminder hasn't been sent yet
                                // Send email reminder to the passenger

                                return User.findOne({
                                  where: {
                                    id: booking.UserId,
                                  },
                                })
                                  .then((user) => {
                                    if (user) {
                                      // Send the reminder email

                                      emailController.sendEmail(
                                        user,
                                        emailTemplates.reminderRating({
                                          user,
                                          ride,
                                          booking,
                                        })
                                      );

                                      // Creating the reminder
                                      return emailReminderRating
                                        .create({
                                          UserId: booking.UserId,
                                          RideId: booking.RideId,
                                          BookingId: booking.id,
                                        })
                                        .then((response) => {
                                          // All done here | Next is driver
                                        })
                                        .catch((error) => {
                                          // An error occured
                                          consoleError(
                                            fileName,
                                            arguments.callee.name,
                                            Error().stack,
                                            error
                                          );
                                          consoleCronStop(fileName);
                                        });
                                    } else {
                                      consoleCronStop(fileName);
                                    }
                                  })
                                  .catch((error) => {
                                    // An error occured
                                    consoleError(
                                      fileName,
                                      arguments.callee.name,
                                      Error().stack,
                                      error
                                    );
                                    consoleCronStop(fileName);
                                  });
                              } else {
                                // A reminder has already being sent out to the passenger
                              }
                            })
                            .catch((error) => {
                              // An error occured
                              consoleError(
                                fileName,
                                arguments.callee.name,
                                Error().stack,
                                error
                              );
                              consoleCronStop(fileName);
                            });
                        }
                      })
                      .catch((error) => {
                        // An error occured
                        consoleError(
                          fileName,
                          arguments.callee.name,
                          Error().stack,
                          error
                        );
                        consoleCronStop(fileName);
                      });

                    // Second, the driver's rating
                    return DriverRating.findOne({
                      where: {
                        BookingId: booking.id,
                        RideId: booking.RideId,
                        DriverId: booking.DriverId,
                      },
                    })
                      .then((driverRating) => {
                        if (driverRating) {
                          // The driver has rated already
                        } else {
                          // Check if we already have sent an email
                          return emailReminderRating
                            .findOne({
                              where: {
                                UserId: booking.DriverId,
                                RideId: booking.RideId,
                                BookingId: booking.id,
                              },
                            })
                            .then((reminder) => {
                              if (!reminder) {
                                // The reminder hasn't been sent yet
                                // Send email reminder to the driver

                                return User.findOne({
                                  where: {
                                    id: booking.DriverId,
                                  },
                                })
                                  .then((user) => {
                                    if (user) {
                                      // Send the reminder email

                                      emailController.sendEmail(
                                        user,
                                        emailTemplates.reminderRating({
                                          user,
                                          ride,
                                          booking,
                                        })
                                      );

                                      // Creating the reminder
                                      return emailReminderRating
                                        .create({
                                          UserId: booking.DriverId,
                                          RideId: booking.RideId,
                                          BookingId: booking.id,
                                        })
                                        .then((response) => {
                                          // Done
                                        })
                                        .catch((error) => {
                                          // An error occured
                                          consoleError(
                                            fileName,
                                            arguments.callee.name,
                                            Error().stack,
                                            error
                                          );
                                          consoleCronStop(fileName);
                                        });
                                    } else {
                                      // User not found
                                    }
                                  })
                                  .catch((error) => {
                                    // An error occured
                                    consoleError(
                                      fileName,
                                      arguments.callee.name,
                                      Error().stack,
                                      error
                                    );
                                    consoleCronStop(fileName);
                                  });
                              } else {
                                // A reminder has already being sent out to the driver
                              }
                            })
                            .catch((error) => {
                              // An error occured
                              consoleError(
                                fileName,
                                arguments.callee.name,
                                Error().stack,
                                error
                              );
                              consoleCronStop(fileName);
                            });
                        }
                      })
                      .catch((error) => {
                        // An error occured
                        consoleError(
                          fileName,
                          arguments.callee.name,
                          Error().stack,
                          error
                        );
                        consoleCronStop(fileName);
                      });
                  });
                }
              })
              .catch((error) => {
                consoleError(
                  fileName,
                  arguments.callee.name,
                  Error().stack,
                  error
                );
                consoleCronStop(fileName);
              });
          }
        });
      } else {
        consoleCronStop(fileName);
      }
    })
    .catch((error) => {
      consoleError(fileName, arguments.callee.name, Error().stack, error);
      consoleCronStop(fileName);
    });
};
