const path = require("path");
const fileName = path.basename(__filename);

const db = require("../models");
const User = db.User;
const Driver = db.Driver;
const Ride = db.Ride;
const Op = db.Sequelize.Op;

const emailController = require("../controllers/email.controller");
const emailTemplates = require("../controllers/EmailTemplates");
const Booking = db.Booking;

const { consoleError, consoleCronStop } = require("../helpers");

const now = new Date();
const in12hours = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate(),
  now.getHours() + 12,
  now.getMinutes()
);

// Function
module.exports = function afterRide() {
  return Ride.findAll({
    where: {
      dateTimeDestination: {
        [Op.lte]: in12hours,
      },
      RideStatusId: {
        [Op.lt]: 3,
      },
    },
    include: [
      {
        model: Driver,
        include: [
          {
            model: User,
            attributes: {
              exclude: [
                "biography",
                "password",
                "phoneNumber",
                "createdAt",
                "updatedAt",
              ],
            },
          },
        ],
      },
    ],
  })
    .then((rides) => {
      if (rides.length) {
        rides.map((ride) => {
          // We update the ride to "Done"
          return Ride.update(
            {
              RideStatusId: 3,
            },
            {
              where: {
                id: ride.id,
              },
            }
          )
            .then((response) => {
              // If booking were made
              if (ride.seatsAvailable !== ride.seatsLeft) {
                // The ride had bookings
                // Get the accepted booking (StatusId === 3)

                // First, send an email to the driver
                emailController.sendEmail(
                  ride.Driver.User,
                  emailTemplates.afterRide(ride)
                );

                return Booking.findAll({
                  where: {
                    RideId: ride.id,
                    BookingStatusId: 3,
                  },
                  include: [
                    {
                      model: User,
                      attributes: {
                        exclude: [
                          "biography",
                          "password",
                          "phoneNumber",
                          "createdAt",
                          "updatedAt",
                        ],
                      },
                    },
                  ],
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
                        emailController.sendEmail(
                          booking.User,
                          emailTemplates.afterRide(ride)
                        );
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
        consoleCronStop(fileName);
      } else {
        consoleCronStop(fileName);
      }
    })
    .catch((error) => {
      consoleError(fileName, arguments.callee.name, Error().stack, error);
      consoleCronStop(fileName);
    });
};
