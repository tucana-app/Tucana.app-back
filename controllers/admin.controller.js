const path = require("path");
const fileName = path.basename(__filename);

const db = require("../models");
const config = require("../config/user.config");

const afterRide = require("../crons/afterRide");
const beforeRide = require("../crons/beforeRide");

const emailController = require("./email.controller");
const emailTemplates = require("./EmailTemplates/");
const {
  updateExperienceUser,
  pointsGrid,
  consoleError,
} = require("../helpers");

const Admin = db.Admin;
const Role = db.Role;
const admins_roles = db.admins_roles;
const User = db.User;
const Ride = db.Ride;
const Driver = db.Driver;
const Car = db.Car;
const DriverApplication = db.DriverApplication;
const RideStatus = db.RideStatus;
const Booking = db.Booking;
const BookingStatus = db.BookingStatus;
const PassengerRating = db.PassengerRating;
const DriverRating = db.DriverRating;
const Rating = db.Rating;
const admin_VerifPassengerRating = db.admin_VerifPassengerRating;
const admin_VerifDriverRating = db.admin_VerifDriverRating;
const Op = db.Sequelize.Op;
const admin_VerifDriverApplication = db.admin_VerifDriverApplication;
const Conversation = db.Conversation;
const Message = db.Message;
const MessageStatus = db.MessageStatus;
const ExperienceUser = db.ExperienceUser;
const RideFeedback = db.RideFeedback;
const ConfirmEmail = db.ConfirmEmail;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const errorMessage = { message: "A problem occured with this request" };

module.exports = {
  adminSignin(req, res) {
    let { credential, password } = req.body.formLogin;

    return Admin.findOne({
      where: {
        [Op.or]: {
          username: credential,
          username: credential.toLowerCase(),
          email: credential,
          email: credential.toLowerCase(),
        },
      },
      include: [
        {
          model: Role,
          attributes: {
            exclude: ["code", "createdAt", "updatedAt"],
          },
        },
      ],
    })
      .then((admin) => {
        if (!admin) {
          res
            .status(404)
            .send({ message: "User not found", flag: "USER_NOT_FOUND" });
        } else {
          var passwordIsValid = bcrypt.compareSync(password, admin.password);

          if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password",
              flag: "INVALID_PASSWORD",
            });
          } else {
            var token = jwt.sign({ id: admin.id }, config.secret, {
              expiresIn: 86400, // 1 day
            });

            const roles = [];
            admin.Roles.map((role) => {
              roles.push(role.id);
            });

            res.status(200).send({
              adminId: admin.id,
              firstName: admin.firstName,
              lastName: admin.lastName,
              username: admin.username,
              email: admin.email,
              createdAt: admin.createdAt,
              roles,
              accessToken: token,
            });
          }
        }
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(500).send({
          message: "It looks like we can't log you in right now",
          flag: "GENERAL_ERROR",
        });
      });
  },

  adminListUsers(req, res) {
    return User.findAll({
      order: [["id", "DESC"]],
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

  adminListRides(req, res) {
    return Ride.findAll({
      order: [["id", "DESC"]],
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

  adminSingleRide(req, res) {
    return Ride.findOne({
      where: {
        id: req.query.rideId,
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

  adminSingleRideAllBookings(req, res) {
    return Booking.findAll({
      where: {
        RideId: req.query.rideId,
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

  adminPassengersRatings(req, res) {
    let ratingsPassenger = [];

    (async function () {
      let ratings = await PassengerRating.findAll({
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
          },
          {
            model: Booking,
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
      });

      if (ratings.length !== 0) {
        await Promise.all(
          ratings.map((rating) => {
            return admin_VerifPassengerRating
              .findOne({
                where: {
                  PassengerRatingId: rating.id,
                },
                include: [
                  {
                    model: Admin,
                  },
                ],
              })
              .then((verif) => {
                ratingsPassenger.push({ rating, AdminVerif: verif });
              });
          })
        ).catch((error) => res.status(400).json([]));

        return res.status(200).json(ratingsPassenger);
      } else {
        res.status(200).json(ratingsPassenger);
      }
    })();
  },

  adminDriversRatings(req, res) {
    let ratingsDriver = [];

    (async function () {
      let ratings = await DriverRating.findAll({
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
          },
          {
            model: Booking,
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
      });

      if (ratings.length !== 0) {
        await Promise.all(
          ratings.map((rating) => {
            return admin_VerifDriverRating
              .findOne({
                where: {
                  DriverRatingId: rating.id,
                },
                include: [
                  {
                    model: Admin,
                  },
                ],
              })
              .then((verif) => {
                ratingsDriver.push({ rating, AdminVerif: verif });
              });
          })
        ).catch((error) => res.status(400).json([]));

        return res.status(200).json(ratingsDriver);
      } else {
        res.status(200).json(ratingsDriver);
      }
    })();
  },

  adminAllDriversApplications(req, res) {
    return DriverApplication.findAll({
      order: [["id", "DESC"]],
      include: [
        {
          model: admin_VerifDriverApplication,
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

  adminDriverApplication(req, res) {
    const { applicationId } = req.query;

    return DriverApplication.findOne({
      where: {
        id: applicationId,
      },
      include: [
        {
          model: admin_VerifDriverApplication,
          include: [
            {
              model: Admin,
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

  submitVerifDriverApplication(req, res) {
    const { adminId, application, comment, isAccepted } = req.body;

    return admin_VerifDriverApplication
      .create({
        AdminId: adminId,
        DriverApplicationId: application.id,
        isAccepted,
        comment,
      })
      .then((response) => {
        // console.log(response);

        if (isAccepted) {
          // Create the new driver
          return Driver.create({
            id: application.UserId,
            UserId: application.UserId,
            idType: application.idType,
            idNumber: application.idNumber,
            idCountry: application.idCountry,
            licenseNumber: application.licenseNumber,
            licenseCountry: application.licenseCountry,
          })
            .then((response) => {
              // console.log(response);

              return Car.create({
                DriverId: response.dataValues.id,
                maker: application.carMaker,
                model: application.carModel,
                numberPlate: application.numberPlate,
                year: application.carYear,
                color: application.carColor,
                marchamo: application.carMarchamo,
                riteve: application.carRiteve,
              })
                .then((response) => {
                  // console.log(response);
                  emailController.sendEmail(
                    application.User,
                    emailTemplates.becomeDriver(isAccepted, comment)
                  );

                  updateExperienceUser(
                    application.UserId,
                    pointsGrid.BECOME_DRIVER
                  );

                  res.status(200).json({});
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
          res.status(200).json({});

          emailController.sendEmail(
            application.User,
            emailTemplates.becomeDriver(isAccepted, comment)
          );
        }
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  adminPassengerRating(req, res) {
    const { ratingId } = req.query;

    return PassengerRating.findOne({
      where: {
        id: ratingId,
      },
      include: [
        {
          model: admin_VerifPassengerRating,
          include: [
            {
              model: Admin,
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
        res.status(200).json(response);
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  submitVerifPassengerRating(req, res) {
    const { adminId, rating, comment, isAccepted } = req.body;

    return admin_VerifPassengerRating
      .create({
        AdminId: adminId,
        PassengerRatingId: rating.id,
        isAccepted,
        comment,
      })
      .then((response) => {
        // console.log(response);

        if (isAccepted) {
          emailController.sendEmail(
            rating.User,
            emailTemplates.passengerReceivedRating(rating.Driver.User)
          );

          updateExperienceUser(rating.User.id, pointsGrid.ADD_REVIEW);

          // Update the passenger's rating
          PassengerRating.findAll({
            where: {
              UserId: rating.User.id,
            },
            include: [
              {
                model: admin_VerifPassengerRating,
              },
            ],
          })
            .then((ratings) => {
              let notes, totalNotes, average, nbRatings;

              // Find all accepted ratings
              notes = ratings.filter((rating) => {
                if (rating.admin_VerifPassengerRating) {
                  return rating.admin_VerifPassengerRating.dataValues
                    .isAccepted;
                }
              });

              // This is the first rating
              if (notes.length === 0 || notes.length === 1) {
                average = rating.value;
                nbRatings = 1;
              } else {
                // If the passenger has already been reviewed
                totalNotes = notes.reduce(
                  (total, item) => item.dataValues.value + total,
                  0
                );

                nbRatings = notes.length;

                average = +(totalNotes / nbRatings).toFixed(2);
              }

              return Rating.update(
                {
                  passengerRating: average,
                  nbPassengerRating: notes.length,
                },
                {
                  where: {
                    id: rating.User.id,
                  },
                }
              )
                .then((response) => {
                  // console.log(response)
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
        }

        emailController.sendEmail(
          rating.Driver.User,
          emailTemplates.driverRatingStatus(isAccepted, rating.User, comment)
        );

        res.status(200).json(response);
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  adminDriverRating(req, res) {
    const { ratingId } = req.query;

    return DriverRating.findOne({
      where: {
        id: ratingId,
      },
      include: [
        {
          model: admin_VerifDriverRating,
          include: [
            {
              model: Admin,
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
        res.status(200).json(response);
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  submitVerifDriverRating(req, res) {
    const { adminId, rating, comment, isAccepted } = req.body;

    return admin_VerifDriverRating
      .create({
        AdminId: adminId,
        DriverRatingId: rating.id,
        isAccepted,
        comment,
      })
      .then((response) => {
        // console.log(response);

        if (isAccepted) {
          emailController.sendEmail(
            rating.Driver.User,
            emailTemplates.passengerReceivedRating(rating.User)
          );

          updateExperienceUser(rating.User.id, pointsGrid.ADD_REVIEW);

          // Update the driver's rating
          DriverRating.findAll({
            where: {
              UserId: rating.Driver.User.id,
            },
            include: [
              {
                model: admin_VerifDriverRating,
              },
            ],
          })
            .then((ratings) => {
              let notes, totalNotes, average, nbRatings;

              // Find all accepted ratings
              notes = ratings.filter((rating) => {
                if (rating.admin_VerifDriverRating) {
                  return rating.admin_VerifDriverRating.dataValues.isAccepted;
                }
              });

              // This is the first rating
              if (notes.length === 0 || notes.length === 1) {
                average = rating.value;
                nbRatings = 1;
              } else {
                // If the driver has already been reviewed
                totalNotes = notes.reduce(
                  (total, item) => item.dataValues.value + total,
                  0
                );

                nbRatings = notes.length;

                average = +(totalNotes / nbRatings).toFixed(2);
              }

              return Rating.update(
                {
                  driverRating: average,
                  nbDriverRating: nbRatings,
                },
                {
                  where: {
                    id: rating.Driver.User.id,
                  },
                }
              )
                .then((response) => {
                  // console.log(response)
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
        }

        emailController.sendEmail(
          rating.User,
          emailTemplates.driverRatingStatus(
            isAccepted,
            rating.Driver.User,
            comment
          )
        );

        res.status(200).json(response);
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  cronBeforeRide(req, res) {
    return beforeRide()
      .then((response) => {
        res.status(200).send({ message: "OK", flag: "SUCCESS" });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  cronAfterRide(req, res) {
    return afterRide()
      .then((response) => {
        res.status(200).send({ message: "OK", flag: "SUCCESS" });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  adminListConversations(req, res) {
    return Conversation.findAll({
      order: [["id", "ASC"]],
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
          model: Message,
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

  adminSingleConversation(req, res) {
    return Message.findAll({
      where: {
        ConversationId: req.query.conversationId,
      },
      order: [["createdAt", "DESC"]],
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
          model: MessageStatus,
        },
        {
          model: Conversation,
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

  adminSingleUser(req, res) {
    return User.findOne({
      where: {
        id: req.query.userId,
      },
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: Driver,
          include: [
            {
              model: Car,
            },
          ],
        },
        {
          model: ExperienceUser,
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

  adminSingleUserAllBookingsMade(req, res) {
    return Booking.findAll({
      where: {
        UserId: req.query.userId,
      },
      order: [["id", "DESC"]],
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

  adminSingleDriverAllBookingsReceived(req, res) {
    return Driver.findOne({
      where: {
        UserId: req.query.userId,
      },
    })
      .then((driver) => {
        if (driver) {
          return Booking.findAll({
            where: {
              DriverId: driver.id,
            },
            order: [["id", "DESC"]],
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
              consoleError(
                fileName,
                arguments.callee.name,
                Error().stack,
                error
              );
              res.status(400).json(errorMessage);
            });
        } else {
          res.status(400).json({ message: "The user isn't a driver" });
        }
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  adminSingleDriverAllRidesPublished(req, res) {
    return Driver.findOne({
      where: {
        UserId: req.query.userId,
      },
    })
      .then((driver) => {
        if (driver) {
          return Ride.findAll({
            where: {
              DriverId: driver.id,
            },
            order: [["id", "DESC"]],
            include: [
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
              consoleError(
                fileName,
                arguments.callee.name,
                Error().stack,
                error
              );
              res.status(400).json(errorMessage);
            });
        } else {
          res.status(400).json({ message: "The user isn't a driver" });
        }
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  adminListBookings(req, res) {
    return Booking.findAll({
      order: [["RideId", "DESC"]],
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

  adminSingleBooking(req, res) {
    return Booking.findOne({
      where: {
        id: req.query.bookingId,
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
        res.status(400).json(error);
      });
  },

  adminListFeedbacks(req, res) {
    return RideFeedback.findAll({
      order: [["isConfirmed", "ASC"]],
    })
      .then((response) => {
        // console.log(response);
        res.status(200).json(response);
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(error);
      });
  },

  adminListAdmins(req, res) {
    return Admin.findAll({
      order: [["id", "DESC"]],
      include: [
        {
          model: Role,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["password"],
      },
    })
      .then((admins) => {
        // console.log(admins);
        res.status(200).json(admins);
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  createAdmin(req, res) {
    const { values } = req.body;

    return Admin.create({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email.toLowerCase(),
      username: values.username.toLowerCase().replace(" ", ""),
      password: bcrypt.hashSync(values.password, 10),
    })
      .then((admin) => {
        // console.log(response);

        values.roles.map((role) => {
          return admins_roles.create({
            AdminId: admin.id,
            RoleId: role,
          });
        });

        res.status(200).json({ message: "OK", flag: "SUCCESS" });
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(error);
      });
  },

  updateDob(req, res) {
    const { userId, dob } = req.body.values;
    console.log(userId, dob);

    return User.update(
      {
        dateOfBirth: new Date(dob),
      },
      {
        where: {
          id: userId,
        },
      }
    )
      .then((response) => {
        if (response[0] !== 0) {
          res.status(200).json({ message: "OK", flag: "SUCCESS" });
        } else {
          res.status(400).json({ message: "NOK", flag: "ERROR" });
        }
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(error);
      });
  },
};
