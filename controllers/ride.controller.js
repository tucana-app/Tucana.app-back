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
  calculateDistance,
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
const Sequelize = db.Sequelize;

var distance = require("hpsweb-google-distance");
distance.apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const errorMessage = { message: "A problem occured with this request" };

module.exports = {
  getDriverRides(req, res) {
    return Ride.findAll({
      where: {
        DriverId: req.query.driverId,
      },
      order: [["dateTimeOrigin", "ASC"]],
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

    return Ride.create({
      DriverId: user.Driver.id,
      origin: formPublishRide.origin,
      destination: formPublishRide.destination,
      dateTimeOrigin: formPublishRide.dateTimeOrigin,
      dateTimeDestination: formPublishRide.dateTimeDestination,
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

        emailController.sendEmailToAdmin(emailTemplates.admin_newRide());

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
    const { origin, destination, date, seats } = req.query;

    searchOrigin = JSON.parse(origin);
    searchDestination = JSON.parse(destination);

    const datePlusOne = new Date(date);
    datePlusOne.setDate(datePlusOne.getDate() + 1);

    return Ride.findAll({
      where: {
        seatsLeft: {
          [Op.gt]: 0,
        },
        RideStatusId: 1,
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

        if (response.length) {
          var arrayRidesOriginLatLng = [];
          var arrayRidesDestinationLatLng = [];
          let ridesToCalculate = []; // rides we need to calculate the real distance from and to

          // If the origin or destination is located within a 50km radius
          // we add them to a queue where we calculate the true distance with a car
          // allows to save some unecessary API calls
          response.map((ride, index) => {
            if (
              calculateDistance(
                ride.dataValues.origin.latLng.lat,
                ride.dataValues.origin.latLng.lng,
                searchOrigin.latLng.lat,
                searchOrigin.latLng.lng
              ) <= 50000 &&
              calculateDistance(
                ride.dataValues.destination.latLng.lat,
                ride.dataValues.destination.latLng.lng,
                searchDestination.latLng.lat,
                searchDestination.latLng.lng
              ) <= 50000
            ) {
              ridesToCalculate.push(ride);

              arrayRidesOriginLatLng.push(
                `${ride.dataValues.origin.latLng.lat},${ride.dataValues.origin.latLng.lng}`
              );

              arrayRidesDestinationLatLng.push(
                `${ride.dataValues.destination.latLng.lat},${ride.dataValues.destination.latLng.lng}`
              );
            }
          });

          if (ridesToCalculate.length) {
            (async function () {
              const promiseDistanceOrigin = distance
                .get({
                  origin: `${searchOrigin.latLng.lat},${searchOrigin.latLng.lng}`,
                  destinations: arrayRidesOriginLatLng,
                })
                .then((data) => data)
                .catch((error) => {
                  console.log("5", error);
                  res.status(400).json(errorMessage);
                });

              const promiseDistanceDestination = distance
                .get({
                  origin: `${searchDestination.latLng.lat},${searchDestination.latLng.lng}`,
                  destinations: arrayRidesDestinationLatLng,
                })
                .then((data) => data)
                .catch((error) => {
                  console.log("6", error);
                  res.status(400).json(errorMessage);
                });

              Promise.all([promiseDistanceOrigin, promiseDistanceDestination])
                .then((distances) => {
                  const ridesWithDistance = [];
                  const distancesOrigin = distances[0];
                  const distancesDestination = distances[1];

                  ridesToCalculate.map((ride, index) => {
                    if (
                      distancesOrigin[index].distanceValue <= 30000 &&
                      distancesDestination[index].distanceValue <= 30000
                    ) {
                      ridesWithDistance.push({
                        rideDetails: ride,
                        distanceFromOrigin: distancesOrigin[index],
                        distanceFromDestination: distancesDestination[index],
                      });
                    }
                  });

                  if (ridesWithDistance.length) {
                    // res.status(200).json(ridesWithDistance);
                    res.status(200).json(ridesWithDistance);
                  } else {
                    res.status(200).json({});
                  }
                })
                .catch((error) => {
                  console.log("10", error);
                  res.status(400).json(errorMessage);
                });
            })();
          } else {
            // No rides found under 50km radius
            res.status(200).json({});
          }
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
          const driverId = user.Driver ? user.Driver.id : 0;

          let bookings = await Booking.findAll({
            where: {
              [Op.or]: {
                UserId: user.id,
                DriverId: driverId,
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

  ridesOnline(req, res) {
    return Ride.findAndCountAll({
      order: [["dateTimeOrigin", "DESC"]],
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
        res.status(200).json(response);
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  cancelRide(req, res) {
    const { driverId, rideId, reason } = req.body;

    return Driver.findOne({
      where: {
        id: driverId,
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: [
              "lastName",
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
      .then((driver) => {
        // console.log(driver);

        if (driver) {
          return Ride.update(
            {
              comment: `Reason for cancellation: ${reason}`,
              RideStatusId: 4,
              seatsLeft: 0,
            },
            {
              where: {
                id: rideId,
              },
            }
          )
            .then((response) => {
              // console.log(response);

              // Look for bookings for this rides
              return Booking.findAll({
                where: {
                  RideId: rideId,
                },
                include: [
                  {
                    model: Ride,
                  },
                  {
                    model: User,
                    attributes: {
                      exclude: [
                        "lastName",
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

                  // If bookings were made for this ride
                  // Cancel all bookings, and send email to the user
                  bookings.length &&
                    bookings.map((booking, index) => {
                      if (booking.BookingStatusId <= 3) {
                        return Booking.update(
                          {
                            BookingStatusId: 5,
                            commentDriver: `Canceled by Driver. Reason: ${reason}`,
                          },
                          {
                            where: {
                              id: booking.id,
                            },
                          }
                        ).catch((error) => {
                          consoleError(
                            fileName,
                            arguments.callee.name,
                            Error().stack,
                            error
                          );

                          res.status(400).json(errorMessage);
                        });
                      }

                      if (booking.BookingStatusId < 2) {
                        // If the booking is pending or seen
                        // Send email. Ride not charged

                        emailController.sendEmail(
                          booking.User,
                          emailTemplates.cancelRideToUser(
                            booking.Ride,
                            driver.User,
                            reason
                          )
                        );
                      } else if (booking.BookingStatusId === 3) {
                        // If the booking is accepted
                        // Send email. Ride refunded

                        emailController.sendEmail(
                          booking.User,
                          emailTemplates.cancelRideToUser(
                            booking.Ride,
                            driver.User,
                            reason
                          )
                        );
                      }
                    });

                  // Email the driver
                  return Ride.findOne({
                    where: {
                      id: rideId,
                    },
                  })
                    .then((ride) => {
                      // console.log(ride);
                      emailController.sendEmail(
                        driver.User,
                        emailTemplates.cancelRideToDriver(ride, reason)
                      );

                      res.status(200).json({ flag: "SUCCESS" });
                    })
                    .catch((error) => {
                      consoleError(
                        fileName,
                        arguments.callee.name,
                        Error().stack,
                        error
                      );
                    });
                })
                .catch((error) => {
                  consoleError(
                    fileName,
                    arguments.callee.name,
                    Error().stack,
                    error
                  );
                  res.status(400).json(errorMessage);
                });
            })
            .catch((error) => {
              consoleError(
                fileName,
                arguments.callee.name,
                Error().stack,
                error
              );
              res.status(400).json(errorMessage);
            });
        } else {
          res
            .status(403)
            .json({ message: "You are not the driver for this ride" });
        }
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },
};
