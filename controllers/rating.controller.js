const path = require("path");
const fileName = path.basename(__filename);
require("dotenv").config;

const { consoleError } = require("../helpers");

const db = require("../models");
const User = db.User;
const Driver = db.Driver;
const Ride = db.Ride;
const Rating = db.Rating;
const RideFeedback = db.RideFeedback;
const Booking = db.Booking;
const PassengerRating = db.PassengerRating;
const DriverRating = db.DriverRating;
const admin_VerifPassengerRating = db.admin_VerifPassengerRating;
const admin_VerifDriverRating = db.admin_VerifDriverRating;
const Op = db.Sequelize.Op;
const emailController = require("./email.controller");
const emailTemplates = require("./EmailTemplates/");

const errorMessage = { message: "A problem occured with this request" };

module.exports = {
  getRatingToDo(req, res) {
    const { userId, bookingId } = req.query;

    DriverRating.findOne({
      where: {
        UserId: userId,
        BookingId: bookingId,
      },
    })
      .then((driverRating) => {
        if (driverRating) {
          return res
            .status(400)
            .json({
              message: "The rating already exist",
              flag: "RATING_ALREADY_EXIST",
            });
        }
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });

    PassengerRating.findOne({
      where: {
        UserId: userId,
        BookingId: bookingId,
      },
    })
      .then((passengerRating) => {
        if (passengerRating) {
          return res
            .status(400)
            .json({
              message: "The rating already exist",
              flag: "RATING_ALREADY_EXIST",
            });
        }
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });

    return Booking.findOne({
      where: {
        id: bookingId,
        [Op.or]: {
          UserId: userId,
          DriverId: userId,
        },
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
          include: [
            {
              model: Rating,
            },
          ],
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
      .then((booking) => {
        // console.log(booking);
        if (booking) {
          res.status(200).json(booking);
        } else {
          res
            .status(400)
            .json({ message: "No rating to do found", flag: "NOT_FOUND" });
        }
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  getRatingsToDoAsPassenger(req, res) {
    const { userId } = req.query;
    let ratingsToDoPassenger = [];

    (async function () {
      let bookings = await Booking.findAll({
        where: {
          UserId: userId,
          BookingStatusId: 3, // accepted
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
      });

      if (bookings.length) {
        await Promise.all(
          bookings.map((booking) => {
            return Ride.findOne({
              where: {
                id: booking.RideId,
                RideStatusId: 3, // done
              },
            })
              .then((ride) => {
                if (ride) {
                  return RideFeedback.findOne({
                    where: {
                      RideId: ride.id,
                      UserId: userId,
                      isConfirmed: true,
                    },
                  })
                    .then((feedback) => {
                      if (feedback) {
                        return DriverRating.findOne({
                          where: {
                            RideId: ride.id,
                            UserId: userId,
                          },
                        })
                          .then((rating) => {
                            if (!rating) {
                              // Rating needs to be done
                              ratingsToDoPassenger.push(ride);
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
          consoleError(fileName, arguments.callee.name, Error().stack, error);
          res.status(400).json([]);
        });

        return res.status(200).json(ratingsToDoPassenger);
      } else {
        // console.log("No bookings");
        return res.status(200).json(ratingsToDoPassenger);
      }
    })();
  },

  getRatingsToDoAsDriver(req, res) {
    const { userId, driverId } = req.query;
    let ratingsToDoDriver = [];

    (async function () {
      let bookings = await Booking.findAll({
        where: {
          DriverId: driverId,
          BookingStatusId: 3, // accepted
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
      });

      if (bookings.length) {
        await Promise.all(
          bookings.map((booking) => {
            return Ride.findOne({
              where: {
                id: booking.RideId,
                RideStatusId: 3, // done
              },
            })
              .then((ride) => {
                // If the ride is done
                if (ride) {
                  // Look if the ride has been completed
                  return RideFeedback.findOne({
                    where: {
                      RideId: ride.id,
                      UserId: userId,
                      isConfirmed: true,
                    },
                  })
                    .then((feedback) => {
                      if (feedback) {
                        // Look for past ratings now
                        return PassengerRating.findOne({
                          where: {
                            RideId: ride.id,
                            DriverId: driverId,
                          },
                        })
                          .then((rating) => {
                            if (!rating) {
                              // Rating needs to be done
                              ratingsToDoDriver.push(ride);
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
          consoleError(fileName, arguments.callee.name, Error().stack, error);
          res.status(400).json([]);
        });

        return res.status(200).json(ratingsToDoDriver);
      } else {
        // console.log("No bookings");
        return res.status(200).json(ratingsToDoDriver);
      }
    })();
  },

  getRatingsReceivedPassenger(req, res) {
    return PassengerRating.findAll({
      where: {
        UserId: req.query.userId,
      },
      include: [
        {
          model: admin_VerifPassengerRating,
        },
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
      .then((ratings) => {
        // console.log(conversations);
        res.status(200).json(ratings);
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  getRatingsGivenPassenger(req, res) {
    return DriverRating.findAll({
      where: {
        UserId: req.query.userId,
      },
      include: [
        {
          model: admin_VerifDriverRating,
          where: {
            isAccepted: true,
          },
        },
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
      .then((ratings) => {
        // console.log(ratings);
        res.status(200).json(ratings);
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  getRatingsReceivedDriver(req, res) {
    return DriverRating.findAll({
      where: {
        DriverId: req.query.userId,
      },
      include: [
        {
          model: admin_VerifDriverRating,
          where: {
            isAccepted: true,
          },
        },
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
      .then((ratings) => {
        // console.log(conversations);
        res.status(200).json(ratings);
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  getRatingsGivenDriver(req, res) {
    return PassengerRating.findAll({
      where: {
        DriverId: req.query.userId,
      },
      include: [
        {
          model: admin_VerifPassengerRating,
        },
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
      .then((ratings) => {
        // console.log(conversations);
        res.status(200).json(ratings);
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  submitRating(req, res) {
    const { userId, bookingId, note, comment } = req.body;

    return Booking.findOne({
      where: {
        id: bookingId,
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
          include: [
            {
              model: Rating,
            },
          ],
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
      .then((booking) => {
        const isDriver = userId === booking.DriverId ? true : false;

        if (isDriver) {
          return PassengerRating.create({
            UserId: booking.User.id,
            DriverId: booking.Ride.DriverId,
            RideId: booking.Ride.id,
            BookingId: booking.id,
            value: note,
            comment,
          })
            .then((rating) => {
              // console.log(conversations);

              emailController.sendEmailToAdmin(
                emailTemplates.admin_newRating()
              );
              emailController.sendEmail(
                booking.Ride.Driver.User,
                emailTemplates.newRating()
              );

              res.status(201).json({
                flag: "SUCCESS",
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
          return DriverRating.create({
            UserId: booking.User.id,
            DriverId: booking.Ride.DriverId,
            RideId: booking.Ride.id,
            BookingId: booking.id,
            value: note,
            comment,
          })
            .then((rating) => {
              // console.log(conversations);

              emailController.sendEmailToAdmin(
                emailTemplates.admin_newRating()
              );
              emailController.sendEmail(
                booking.User,
                emailTemplates.newRating()
              );

              res.status(201).json({
                flag: "SUCCESS",
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
        }
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  getDriverRatings(req, res) {
    return User.findOne({
      where: {
        username: req.params.username,
      },
      include: [
        {
          model: Driver,
        },
      ],
      attributes: {
        exclude: [
          "password",
          "phoneNumber",
          "phoneConfirmed",
          "firstSetUp",
          "email",
          "emailConfirmed",
          "isClosed",
          "isClosedDate",
        ],
      },
    })
      .then((user) => {
        // console.log(user);
        if (user.Driver) {
          return DriverRating.findAll({
            where: {
              DriverId: user.Driver.id,
            },
          })
            .then((ratings) => {
              res.status(200).json(ratings);
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
            .status(404)
            .json({ message: "User not found", flag: "USER_NOT_FOUND" });
          consoleError(fileName, arguments.callee.name, Error().stack, error);
        }
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  getPassengerRatings(req, res) {
    return User.findOne({
      where: {
        username: req.params.username,
      },
      attributes: {
        exclude: [
          "password",
          "phoneNumber",
          "phoneConfirmed",
          "firstSetUp",
          "email",
          "emailConfirmed",
          "isClosed",
          "isClosedDate",
        ],
      },
    })
      .then((user) => {
        // console.log(user);
        if (user) {
          return PassengerRating.findAll({
            where: {
              UserId: user.id,
            },
          })
            .then((ratings) => {
              res.status(200).json(ratings);
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
            .status(404)
            .json({ message: "User not found", flag: "USER_NOT_FOUND" });
          consoleError(fileName, arguments.callee.name, Error().stack, error);
        }
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },
};
