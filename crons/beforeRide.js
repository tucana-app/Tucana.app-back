const path = require("path");
const fileName = path.basename(__filename);

const emailController = require("../controllers/email.controller");
const emailTemplate = require("../controllers/EmailTemplates/");

const db = require("../models");
const User = db.User;
const Driver = db.Driver;
const Ride = db.Ride;
const Booking = db.Booking;
const Op = db.Sequelize.Op;

const { consoleError, consoleCronStop, DateDiff } = require("../helpers");

const now = new Date();

// Function
module.exports = function beforeRide() {
  return Ride.findAll({
    where: {
      dateTimeOrigin: {
        [Op.gt]: now,
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
      if (rides) {
        rides.map((ride) => {
          if (ride.seatsAvailable !== ride.seatsLeft) {
            const { dys, hrs, min } = DateDiff(ride.dateTimeOrigin, now);

            // Ride coming in less than 1h
            if (dys === 0 && hrs <= 0 && min > 0) {
              emailController.sendEmail(
                ride.Driver.User,
                emailTemplate.beforeRide(ride)
              );
            }

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
                {
                  model: Ride,
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
                },
              ],
            })
              .then((bookings) => {
                if (!bookings) {
                  consoleError(
                    fileName,
                    arguments.callee.name,
                    Error().stack,
                    "No bookings found"
                  );
                } else {
                  bookings.map((booking) => {
                    const { dys, hrs, min } = DateDiff(
                      ride.dateTimeOrigin,
                      now
                    );

                    if (dys === 0 && hrs <= 0 && min > 0) {
                      // Ride coming in less than 1h
                      emailController.sendEmail(
                        booking.User,
                        emailTemplate.beforeRide(ride)
                      );

                      emailController.sendEmail(
                        booking.Driver.User,
                        emailTemplate.beforeRide(ride)
                      );
                    }
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
      }

      consoleCronStop(fileName);
    })
    .catch((error) => {
      consoleError(fileName, arguments.callee.name, Error().stack, error);
      consoleCronStop(fileName);
    });
};
