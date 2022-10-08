const path = require("path");
const fileName = path.basename(__filename);
require("dotenv").config;

const db = require("../models");

const emailController = require("./email.controller");
const emailTemplates = require("./EmailTemplates/");
const { convert } = require("html-to-text");
const {
  updateExperienceUser,
  pointsGrid,
  consoleError,
  changeTimezone,
} = require("../helpers");

const Ride = db.Ride;
const RideFeedback = db.RideFeedback;
const RideStatus = db.RideStatus;
const User = db.User;
const Driver = db.Driver;
const Car = db.Car;
const Rating = db.Rating;
const Booking = db.Booking;
const BookingStatus = db.BookingStatus;
const Op = db.Sequelize.Op;

var distance = require("hpsweb-google-distance");
distance.apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const errorMessage = { message: "A problem occured with this request" };

module.exports = {
  getDriverRides(req, res) {
    return Ride.findAll({
      where: {
        DriverId: req.query.driverId,
      },
      include: [
        {
          model: RideStatus,
          attributes: {
            exclude: ["RideStatusId"],
          },
        },
      ],
    })
      .then((response) => {
        // console.log(response);
        res.status(200).json(response);
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  getETA(req, res) {
    const { originLat, originLng, destinationLat, destinationLng } = req.query;

    return distance
      .get({
        origin: `${originLat},${originLng}`,
        destination: `${destinationLat},${destinationLng}`,
      })
      .then((data) => res.status(200).json(data))
      .catch((error) => {
        // console.log("15", error);
        res.status(400).json(errorMessage);
      });
  },

  addRide(req, res) {
    const { user, formPublishRide } = req.body;
    commentConverted = convert(formPublishRide.comment);

    var dTO = changeTimezone(
      new Date(formPublishRide.dateTimeOrigin),
      "America/Costa_Rica"
    );
    var dTD = changeTimezone(
      new Date(formPublishRide.dateTimeDestination),
      "America/Costa_Rica"
    );

    return Ride.create({
      DriverId: user.Driver.id,
      origin: formPublishRide.origin,
      destination: formPublishRide.destination,
      dateTimeOrigin: dTO,
      dateTimeDestination: dTD,
      ETA: formPublishRide.ETAdata,
      price: formPublishRide.price,
      seatsAvailable: formPublishRide.seats,
      seatsLeft: formPublishRide.seats,
      comment: commentConverted,
    })
      .then((ride) => {
        // console.log(ride);

        res.status(200).json({ ride, flag: "SUCCESS" });

        emailController.sendEmail(user, emailTemplates.publishRide(ride));

        updateExperienceUser(user.id, pointsGrid.PUBLISH_RIDE);
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  getRide(req, res) {
    return Ride.findOne({
      where: {
        id: req.params.rideId,
      },
      order: [["dateTimeOrigin", "ASC"]],
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
              include: [
                {
                  model: Rating,
                },
              ],
            },
            {
              model: Car,
            },
          ],
        },
        {
          model: RideStatus,
        },
      ],
    })
      .then((response) => {
        // console.log(response);
        res.status(200).json(response);
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  getDriverBookings(req, res) {
    return Booking.findAll({
      where: {
        DriverId: req.query.driverId,
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: [
              "email",
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
              model: RideStatus,
            },
          ],
        },
        {
          model: BookingStatus,
        },
      ],
    })
      .then((response) => {
        // console.log(response);
        res.status(200).json(response);
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  getFilteredRides(req, res) {
    const {
      originProvince,
      originLat,
      originLng,
      destinationProvince,
      destinationLat,
      destinationLng,
      date,
    } = req.query;

    const datePlusOne = new Date(date);
    datePlusOne.setDate(datePlusOne.getDate() + 1);

    return Ride.findAll({
      where: {
        seatsLeft: {
          [Op.gt]: 0,
        },
        dateTimeOrigin: {
          [Op.between]: [date, datePlusOne],
        },
      },
      order: [["dateTimeOrigin", "ASC"]],
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
              include: [
                {
                  model: Rating,
                },
              ],
            },
          ],
        },
      ],
    })
      .then((response) => {
        // console.log(response);

        var ridesFound = [];
        var arrayRidesOriginLatLng = [];
        var arrayRidesDestinationLatLng = [];
        // var distanceFromOrigin = [];
        // var distanceFromDestination = [];

        response.map((ride) => {
          if (
            ride.dataValues.origin.province === originProvince &&
            ride.dataValues.destination.province === destinationProvince
          ) {
            ridesFound.push(ride);

            arrayRidesOriginLatLng.push(
              `${ride.dataValues.origin.latLng.lat},${ride.dataValues.origin.latLng.lng}`
            );

            arrayRidesDestinationLatLng.push(
              `${ride.dataValues.destination.latLng.lat},${ride.dataValues.destination.latLng.lng}`
            );
          }
        });

        if (ridesFound.length) {
          (async function () {
            const promiseDistanceOrigin = distance
              .get({
                origin: `${originLat},${originLng}`,
                destinations: arrayRidesOriginLatLng,
              })
              .then((data) => data)
              .catch((error) => {
                console.log("5", error);
                res.status(400).json(errorMessage);
              });

            const promiseDistanceDestination = distance
              .get({
                origin: `${destinationLat},${destinationLng}`,
                destinations: arrayRidesDestinationLatLng,
              })
              .then((data) => data)
              .catch((error) => {
                console.log("6", error);
                res.status(400).json(errorMessage);
              });

            Promise.all([promiseDistanceOrigin, promiseDistanceDestination])
              .then((distances) => {
                const ridesWithDistance = ridesFound.map((ride, index) => ({
                  rideDetails: ride,
                  distanceFromOrigin: distances[0],
                  distanceFromDestination: distances[1],
                }));

                res.status(200).json(ridesWithDistance);
              })
              .catch((error) => {
                console.log("10", error);
                res.status(400).json(errorMessage);
              });
          })();
        } else {
          // No rides found
          res.status(200).json({});
        }
      })
      .catch((error) => {
        console.log("2", error);
        res.status(400).json(errorMessage);
      });
  },

  bookRide(req, res) {
    const { passenger, ride, seats, totalPaidPassenger, totalReceivedDriver } =
      req.body;

    return Booking.create({
      UserId: passenger.id,
      RideId: ride.id,
      DriverId: ride.DriverId,
      seatsBooked: seats,
      totalPaidPassenger,
      totalReceivedDriver,
    })
      .then((booking) => {
        // console.log(response);
        res.status(201).json({
          bookingId: booking.dataValues.id,
          rideId: booking.dataValues.RideId,
          flag: "SUCCESS",
        });

        emailController.sendEmail(
          passenger,
          emailTemplates.bookRideByUser(ride, seats)
        );

        emailController.sendEmail(
          ride.Driver.User,
          emailTemplates.bookRideToDriver(ride, passenger, seats)
        );

        updateExperienceUser(passenger.id, pointsGrid.BOOK_RIDE);
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  driverResponseBooking(req, res) {
    const { booking, formValues } = req.body;

    messageConverted = convert(formValues.comment);

    // if booking accepted by driver
    if (formValues.newStatus === 3) {
      return Booking.update(
        {
          commentDriver: messageConverted,
          BookingStatusId: formValues.newStatus,
        },
        {
          where: {
            id: booking.id,
          },
        }
      )
        .then((response) => {
          return Ride.update(
            {
              seatsLeft: formValues.newSeatsAvailable,
            },
            {
              where: {
                id: formValues.rideId,
              },
            }
          )
            .then((response) => {
              // console.log(response);

              res.status(200).send({
                message: "You have accepted the booking",
                formValues: formValues.newStatus,
              });

              emailController.sendEmail(
                booking.User,
                emailTemplates.acceptedToUser(booking, formValues)
              );
              emailController.sendEmail(
                booking.Ride.Driver.User,
                emailTemplates.acceptedByDriver(booking)
              );

              updateExperienceUser(
                booking.Ride.Driver.User.id,
                pointsGrid.ANSWER_BOOKING
              );
            })
            .catch((error) => {
              consoleError(
                fileName,
                arguments.callee.name,
                Error().stack,
                error
              );
              res.status(400).json(error);
            });
        })
        .catch((error) => {
          consoleError(fileName, arguments.callee.name, Error().stack, error);
          res.status(400).json(error);
        });
    } else if (formValues.newStatus === 4) {
      //if booking refused by driver
      return Booking.update(
        {
          commentDriver: messageConverted,
          BookingStatusId: formValues.newStatus,
        },
        {
          where: {
            id: formValues.bookingId,
          },
        }
      )
        .then((response) => {
          // console.log(response);
          res.status(200).send({
            message: "You have refused this booking",
            formValues: formValues.newStatus,
          });

          emailController.sendEmail(
            booking.User,
            emailTemplates.refusedToUser(booking, formValues)
          );

          emailController.sendEmail(
            booking.Ride.Driver.User,
            emailTemplates.refusedByDriver(booking)
          );

          updateExperienceUser(
            booking.Ride.Driver.User.id,
            pointsGrid.ANSWER_BOOKING
          );
        })
        .catch((error) => {
          consoleError(fileName, arguments.callee.name, Error().stack, error);
          res.status(400).json(error);
        });
    } else {
      return res.status(400).json({});
    }
  },

  getUserBookingsRide(req, res) {
    return Booking.findAll({
      where: {
        UserId: req.query.userId,
        RideId: req.query.rideId,
      },
      include: [
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
        {
          model: BookingStatus,
        },
        {
          model: User,
          attributes: {
            exclude: [
              "lastName",
              "email",
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
      .then((response) => {
        // console.log(response);
        res.status(200).json(response);
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  getDriverBookingsRide(req, res) {
    return Booking.findAll({
      where: {
        DriverId: req.query.driverId,
        RideId: req.query.rideId,
      },
      order: [[BookingStatus, "id", "ASC"]],
      include: [
        {
          model: BookingStatus,
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
                      "lastName",
                      "email",
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
        {
          model: User,
          attributes: {
            exclude: [
              "lastName",
              "email",
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
      .then((response) => {
        // console.log(response);
        res.status(200).json(response);
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  getDriverNewRidesRequests(req, res) {
    return Booking.findAndCountAll({
      where: {
        BookingStatusId: 1,
        DriverId: req.query.driverId,
      },
      order: [["createdAt", "ASC"]],
      attributes: {
        exclude: [
          "RideId",
          "UserId",
          "commentPassenger",
          "commentDriver",
          "updatedAt",
          "BookingStatusId",
          // "id",
          // "seatsBooked",
          // "createdAt",
        ],
      },
      include: [
        {
          model: Ride,
          where: {
            DriverId: req.query.driverId,
            seatsLeft: {
              [Op.gt]: 0,
            },
            dateTimeOrigin: {
              [Op.gt]: new Date(),
            },
          },
          attributes: {
            exclude: [
              "DriverId",
              "comment",
              "RideStatusId",
              "createdAt",
              "updatedAt",
            ],
          },
        },
        {
          model: User,
          attributes: {
            exclude: [
              "email",
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
      .then((response) => {
        // console.log(response);
        res.status(200).json(response);
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  getPassengerBookingsResponses(req, res) {
    return Booking.findAndCountAll({
      where: {
        UserId: req.query.userId,
        [Op.or]: [{ BookingStatusId: 3 }, { BookingStatusId: 4 }],
      },
      order: [["createdAt", "ASC"]],
      attributes: {
        exclude: [
          "RideId",
          "UserId",
          "commentPassenger",
          "commentDriver",
          "updatedAt",
          "BookingStatusId",
          // "id",
          // "seatsBooked",
          // "createdAt",
        ],
      },
      include: [
        {
          model: Ride,
          where: {
            dateTimeOrigin: {
              [Op.gt]: new Date(),
            },
          },
          attributes: {
            exclude: [
              "DriverId",
              "comment",
              "RideStatusId",
              "createdAt",
              "updatedAt",
            ],
          },
          include: [
            {
              model: Driver,
              include: [
                {
                  model: User,
                  attributes: {
                    exclude: [
                      "email",
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
        {
          model: BookingStatus,
        },
      ],
    })
      .then((response) => {
        // console.log(response);
        res.status(200).json(response);
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  getUserBookings(req, res) {
    return Booking.findAll({
      where: {
        UserId: req.query.userId,
      },
      order: [[Ride, "dateTimeOrigin", "ASC"]],
      include: [
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
                      "email",
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
            {
              model: RideStatus,
            },
          ],
        },
        {
          model: User,
        },
        {
          model: BookingStatus,
        },
      ],
    })
      .then((response) => {
        // console.log(response);
        res.status(200).json(response);
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  getPassengers(req, res) {
    return Booking.findAll({
      where: {
        RideId: req.query.rideId,
        BookingStatusId: {
          [Op.eq]: 3,
        },
      },
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "createdAt", "updatedAt"],
          },
        },
        {
          model: Ride,
        },
      ],
    })
      .then((response) => {
        // console.log(response);
        res.status(200).json(response);
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  ridesToConfirm(req, res) {
    const { userId } = req.query;
    const ridesToConfirm = [];

    return User.findOne({
      where: {
        id: userId,
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
      .then((user) => {
        (async function () {
          let bookings = await Booking.findAll({
            where: {
              [Op.or]: {
                UserId: user.id,
                DriverId: user.id,
              },
              BookingStatusId: 3,
            },
            include: [
              {
                model: Ride,
                where: {
                  RideStatusId: 3,
                },
                include: [
                  {
                    model: Driver,
                    include: [
                      {
                        model: User,
                        attributes: {
                          exclude: [
                            "lastName",
                            "email",
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
              {
                model: User,
                attributes: {
                  exclude: [
                    "lastName",
                    "email",
                    "biography",
                    "password",
                    "phoneNumber",
                    "createdAt",
                    "updatedAt",
                  ],
                },
              },
            ],
          });

          if (bookings.length) {
            await Promise.all(
              bookings.map((booking) => {
                return RideFeedback.findOne({
                  where: {
                    UserId: userId,
                    BookingId: booking.id,
                  },
                })
                  .then((feedback) => {
                    if (!feedback) {
                      // The user hasn't already gave a feedback
                      ridesToConfirm.push(booking);
                    }
                  })
                  .catch((error) => {
                    consoleError(
                      fileName,
                      arguments.callee.name,
                      Error().stack,
                      error
                    );
                    res.status(400).json([]);
                  });
              })
            ).catch((error) => {
              consoleError(
                fileName,
                arguments.callee.name,
                Error().stack,
                error
              );

              return res.status(400).json([]);
            });

            return res.status(200).json(ridesToConfirm);
          } else {
            res.status(304).json({
              message: "No rides to complete",
              flag: "NO_RIDES_COMPLETE",
            });
          }
        })();
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json([]);
      });
  },

  rideToConfirm(req, res) {
    const { userId, bookingId } = req.query;

    return Booking.findOne({
      where: {
        id: bookingId,
      },
      include: [
        {
          model: Ride,
          where: {
            RideStatusId: 3,
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
                  include: [
                    {
                      model: Rating,
                    },
                  ],
                },
                {
                  model: Car,
                },
              ],
            },
            {
              model: RideStatus,
            },
          ],
        },
        {
          model: User,
          attributes: {
            exclude: [
              "lastName",
              "email",
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
      .then((booking) => {
        // console.log(booking);
        if (booking) {
          return RideFeedback.findOne({
            where: {
              UserId: userId,
              RideId: booking.RideId,
              BookingId: bookingId,
            },
          })
            .then((feedback) => {
              if (!feedback) {
                // The user hasn't already gave a feedback
                res.status(200).json(booking);
              } else {
                // The user has already gave a feedback
                res.status(400).json({
                  message: "Ride already completed",
                  flag: "ALREADY_COMPLETED",
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
              res.status(400).json([]);
            });
        } else {
          res.status(400).json({
            messagee: "Not booking found",
            flag: "NO_BOOKING_FOUND",
          });
        }
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json([]);
      });
  },

  completeRide(req, res) {
    const { userId, bookingId, rideId, comment, isCompleted } = req.body;

    return RideFeedback.create({
      UserId: userId,
      RideId: rideId,
      BookingId: bookingId,
      isConfirmed: isCompleted,
      userComment: comment,
    })
      .then((response) => {
        // console.log(response);
        res.status(201).json({
          flag: "SUCCESS",
        });

        if (!isCompleted) {
          emailController.sendEmailToAdmin(
            emailTemplates.admin_newRideRejected()
          );
        }

        updateExperienceUser(userId, pointsGrid.CONFIRM_RIDE);

        return User.findOne({
          where: {
            id: userId,
          },
        })
          .then((user) => {
            if (user) {
              return Ride.findOne({
                where: {
                  id: rideId,
                },
              })
                .then((ride) => {
                  if (ride) {
                    emailController.sendEmail(
                      user,
                      emailTemplates.rideFeedback(ride, isCompleted)
                    );
                  } else {
                    consoleError(
                      fileName,
                      arguments.callee.name,
                      Error().stack,
                      "No ride found"
                    );
                  }
                })
                .catch((error) => {
                  consoleError(
                    fileName,
                    arguments.callee.name,
                    Error().stack,
                    error
                  );
                });
            } else {
              consoleError(
                fileName,
                arguments.callee.name,
                Error().stack,
                "No user found"
              );
            }
          })
          .catch((error) => {
            consoleError(fileName, arguments.callee.name, Error().stack, error);
          });
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json({ flag: "ERROR" });
      });
  },

  nbRidesOnline(req, res) {
    return Ride.findAndCountAll({
      where: {
        [Op.and]: {
          dateTimeOrigin: {
            [Op.gte]: new Date(),
          },
          RideStatusId: {
            [Op.lt]: 4,
          },
          seatsLeft: {
            [Op.gt]: 0,
          },
        },
      },
    })
      .then((response) => {
        // console.log(response);
        res.status(200).json(response.count);
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },
};
