const db = require("../models");
const config = require("../config/user.config");

const Admin = db.Admin;
const User = db.User;
const Ride = db.Ride;
const Driver = db.Driver;
const DriverInfo = db.DriverInfo;
const RideStatus = db.RideStatus;
const Booking = db.Booking;
const BookingStatus = db.BookingStatus;
const PassengerRating = db.PassengerRating;
const DriverRating = db.DriverRating;
const admin_VerifPassengerRating = db.admin_VerifPassengerRating;
const admin_VerifDriverRating = db.admin_VerifDriverRating;
const Op = db.Sequelize.Op;
const admin_VerifDriverInfo = db.admin_VerifDriverInfo;
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
      order: [["dateTime", "DESC"]],
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

  adminAllDriversInfo(req, res) {
    return DriverInfo.findAll({
      include: [
        {
          model: admin_VerifDriverInfo,
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

  adminDriverInfo(req, res) {
    const { driverInfoId } = req.query;

    return DriverInfo.findOne({
      where: {
        id: driverInfoId,
      },
      include: [
        {
          model: admin_VerifDriverInfo,
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
        console.log(error);
        res.status(400).json(errorMessage);
      });
  },

  submitVerifDriverInfo(req, res) {
    const { adminId, user, driverInfoId, comment, accepted } = req.body;

    return admin_VerifDriverInfo
      .create({
        AdminId: adminId,
        DriverInfoId: driverInfoId,
        accepted,
        comment,
      })
      .then((response) => {
        // console.log(response);

        if (accepted) {
          // Create the new driver
          return Driver.create({
            UserId: user.id,
          })
            .then((response) => {
              res.status(200).json({});

              emailController.sendEmail(
                user,
                emailTemplates.becomeDriver(accepted, comment)
              );
            })
            .catch((error) => {
              // console.log(error);
              res.status(400).json(errorMessage);
            });
        } else {
          res.status(200).json({});

          emailController.sendEmail(
            user,
            emailTemplates.becomeDriver(accepted, comment)
          );
        }
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json(errorMessage);
      });
  },
};
