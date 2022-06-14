require("dotenv").config;

const db = require("../models");
const Ride = db.Ride;
const RideFeedback = db.RideFeedback;
const RideStatus = db.RideStatus;
const User = db.User;
const Driver = db.Driver;
const Car = db.Car;
const Booking = db.Booking;
const BookingStatus = db.BookingStatus;
const Op = db.Sequelize.Op;

const emailController = require("./email.controller");
const emailTemplates = require("./EmailTemplates/");
const { convert } = require("html-to-text");

var distance = require("hpsweb-google-distance");
distance.apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const errorMessage = { message: "A problem occured with this request" };

module.exports = {
  getDriverRides(req, res) {
    return Ride.findAll({
      where: {
        DriverId: req.query.userId,
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
        // console.log(error);
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
    const { user, formOfferRide } = req.body;

    commentConverted = convert(formOfferRide.comment);

    return Ride.create({
      DriverId: user.id,
      origin: formOfferRide.origin,
      destination: formOfferRide.destination,
      dateTimeOrigin: formOfferRide.dateTimeOrigin,
      dateTimeDestination: formOfferRide.dateTimeDestination,
      ETA: formOfferRide.ETAdata,
      price: formOfferRide.price,
      seatsAvailable: formOfferRide.seats,
      seatsLeft: formOfferRide.seats,
      comment: commentConverted,
    })
      .then((ride) => {
        // console.log(ride);

        res.status(200).json({ flag: "SUCCESS" });

        emailController.sendEmail(user, emailTemplates.offerRide(ride));
      })
      .catch((error) => {
        // console.log(error);
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
        // console.log(error);
        res.status(400).json(errorMessage);
      });
  },

  getBooking(req, res) {
    return Booking.findOne({
      where: {
        id: req.params.bookingId,
      },
      order: [["createdAt", "ASC"]],
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
        // console.log(error);
        res.status(400).json(errorMessage);
      });
  },

  getDriverBookings(req, res) {
    return Booking.findAll({
      where: {
        DriverId: req.query.userId,
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
        // console.log(error);
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

    // Convert the date submitted back to UTC
    const dateTimeZone = new Date(
      `${date.slice(0, 4)},${date.slice(5, 7)},${date.slice(8, 10)}`
    );

    const dateTimeZonePlusOne = new Date(dateTimeZone);
    dateTimeZonePlusOne.setDate(dateTimeZonePlusOne.getDate() + 1);

    return Ride.findAll({
      where: {
        seatsLeft: {
          [Op.gt]: 0,
        },
        dateTimeOrigin: {
          [Op.between]: [dateTimeZone, dateTimeZonePlusOne],
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
    const { passenger, ride, formValues } = req.body;

    if (formValues.seatsNeeded === 0) {
      res.status(400).json({ message: "How many seats do you need?" });
    } else {
      return Booking.create({
        UserId: passenger.id,
        RideId: ride.id,
        DriverId: ride.DriverId,
        seatsBooked: formValues.seatsNeeded,
      })
        .then((booking) => {
          // console.log(response);
          res
            .status(201)
            .json({ message: "Your booking has been submitted to the driver" });

          emailController.sendEmail(
            passenger,
            emailTemplates.bookRideByUser(ride, formValues)
          );
          emailController.sendEmail(
            ride.Driver.User,
            emailTemplates.bookRideToDriver(ride, passenger, formValues)
          );
        })
        .catch((error) => {
          // console.log(error);
          res.status(400).json(errorMessage);
        });
    }
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
            })
            .catch((error) => {
              // console.log(error);
              res.status(400).json(error);
            });
        })
        .catch((error) => {
          // console.log(error);
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
        })
        .catch((error) => {
          // console.log(error);
          res.status(400).json(error);
        });
    } else {
      return res.status(400).json({});
    }
  },

  getUserBookingRide(req, res) {
    return Booking.findAll({
      where: {
        UserId: req.query.userId,
        RideId: req.query.rideId,
      },
      include: [
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
        // console.log(error);
        res.status(400).json(errorMessage);
      });
  },

  getDriverBookingRide(req, res) {
    return Booking.findAll({
      where: {
        DriverId: req.query.driverId,
        RideId: req.query.rideId,
      },
      order: [["createdAt", "ASC"]],
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
        // console.log(error);
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
        // console.log(error);
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
        // console.log(error);
        res.status(400).json(errorMessage);
      });
  },

  getUserBookings(req, res) {
    return Booking.findAll({
      where: {
        UserId: req.query.userId,
      },
      order: [["BookingStatusId", "ASC"]],
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
        // console.log(error);
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
        // console.log(error);
        res.status(400).json(errorMessage);
      });
  },

  getRidesToConfirm(req, res) {
    const { userId } = req.query;
    let ridesToFeedback = [];

    (async function () {
      let bookings = await Booking.findAll({
        where: {
          [Op.or]: {
            UserId: userId,
            DriverId: userId,
          },
          BookingStatusId: 3, // accepted
        },
      });

      if (bookings.length) {
        await Promise.all(
          bookings.map((booking) => {
            return Ride.findOne({
              where: {
                id: booking.RideId,
                RideStatusId: 3, // done
              },
              include: [
                {
                  model: Booking,
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
            }).then((ride) => {
              // If the ride is done
              if (ride) {
                // A feedback need to be given
                return RideFeedback.findOne({
                  where: {
                    UserId: userId,
                    RideId: ride.id,
                    BookingId: booking.id,
                  },
                })
                  .then((feedback) => {
                    if (!feedback) {
                      // Feedback missing
                      ridesToFeedback.push(ride);
                    }
                  })
                  .catch((error) => res.status(400).json([]));
              }
            });
          })
        ).catch((error) => res.status(400).json([]));

        return res.status(200).json(ridesToFeedback);
      } else {
        // console.log("No bookings");
        return res.status(200).json(ridesToFeedback);
      }
    })();
  },

  confirmRide(req, res) {
    const { ride, userId, isRideHappened } = req.body;

    return RideFeedback.create({
      UserId: userId,
      RideId: ride.id,
      BookingId: ride.Booking.id,
      DriverId: ride.DriverId,
      rideHappened: isRideHappened,
    })
      .then((response) => {
        // console.log(response);
        res.status(201).json({
          message: "Thank you for submitting your answer",
          flag: "SUCCESS",
        });
      })
      .catch((error) => {
        // console.log(error);
        res
          .status(400)
          .json({ message: "We couldn't confirm the ride", flag: "ERROR" });
      });
  },
};
