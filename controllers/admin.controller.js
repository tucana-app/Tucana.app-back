const db = require("../models");
const config = require("../config/user.config");

const Admin = db.Admin;
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
const admin_VerifPassengerRating = db.admin_VerifPassengerRating;
const admin_VerifDriverRating = db.admin_VerifDriverRating;
const Op = db.Sequelize.Op;
const admin_VerifDriverApplication = db.admin_VerifDriverApplication;
const emailController = require("./email.controller");
const emailTemplates = require("./EmailTemplates/");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const errorMessage = { message: "A problem occured with this request" };

module.exports = {
  adminSignin(req, res) {
    return Admin.findOne({
      where: {
        [Op.or]: {
          username: req.body.formLogin.credential,
          username: req.body.formLogin.credential.toLowerCase(),
          email: req.body.formLogin.credential,
          email: req.body.formLogin.credential.toLowerCase(),
        },
      },
    })
      .then((admin) => {
        if (!admin) {
          res
            .status(404)
            .send({ message: "User not found", flag: "GENERAL_ERROR" });
        } else {
          var passwordIsValid = bcrypt.compareSync(
            req.body.formLogin.password,
            admin.password
          );

          if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password",
            });
          }

          var token = jwt.sign({ id: admin.id }, config.secret, {
            expiresIn: 86400, // 1 day
          });

          res.status(200).send({
            adminId: admin.id,
            firstName: admin.firstName,
            lastName: admin.lastName,
            username: admin.username,
            email: admin.email,
            createdAt: admin.createdAt,
            accessToken: token,
          });
        }
      })
      .catch((error) => {
        // console.log(error);
        res.status(500).send({
          message: "It looks like we can't log you in right now",
          flag: "GENERAL_ERROR",
        });
      });
  },

  adminListUsers(req, res) {
    return User.findAll()
      .then((response) => {
        // console.log(response);
        res.status(200).json(response);
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json(errorMessage);
      });
  },

  adminListRides(req, res) {
    return Ride.findAll({
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
        // console.log(error);
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
        // console.log(error);
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
        // console.log(error);
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
        // console.log(error);
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
                numberPlate: application.numberPlate,
              })
                .then((response) => {
                  // console.log(response);
                  emailController.sendEmail(
                    application.User,
                    emailTemplates.becomeDriver(isAccepted, comment)
                  );

                  res.status(200).json({});
                })
                .catch((error) => {
                  // console.log(error);
                  res.status(400).json(errorMessage);
                });
            })
            .catch((error) => {
              // console.log(error);
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
        // console.log(error);
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
        console.log(error);
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
        }

        emailController.sendEmail(
          rating.Driver.User,
          emailTemplates.driverRatingStatus(isAccepted, rating.User, comment)
        );

        res.status(200).json(response);
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json(errorMessage);
      });
  },
};
