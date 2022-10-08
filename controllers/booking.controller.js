const path = require("path");
const fileName = path.basename(__filename);
require("dotenv").config;

const db = require("../models");
const Ride = db.Ride;
const RideStatus = db.RideStatus;
const User = db.User;
const Driver = db.Driver;
const Rating = db.Rating;
const Booking = db.Booking;
const BookingStatus = db.BookingStatus;
const Op = db.Sequelize.Op;

const { consoleError } = require("../helpers");

const errorMessage = { message: "A problem occured with this request" };

module.exports = {
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
                  include: [
                    {
                      model: Rating,
                    },
                  ],
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
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  submitCancelBooking(req, res) {
    const { bookingId, comment } = req.body;
    const now = new Date();

    return Booking.findOne({
      where: {
        id: bookingId,
        BookingStatusId: {
          [Op.lt]: 4,
        },
      },
    })
      .then((booking) => {
        // console.log(booking);
        if (booking) {
          return Ride.findOne({
            where: {
              id: booking.RideId,
              RideStatusId: 1,
              dateTimeOrigin: {
                [Op.gt]: now,
              },
            },
          })
            .then((ride) => {
              if (ride) {
                // Calculate time of cancelation

                // let date24hours = new Date(
                //   ride.dateTimeOrigin.getFullYear(),
                //   ride.dateTimeOrigin.getMonth(),
                //   ride.dateTimeOrigin.getDate(),
                //   ride.dateTimeOrigin.getHours() - 24,
                //   ride.dateTimeOrigin.getMinutes()
                // );

                // if (now < date24hours) {
                //   console.log("More than 24 hours");
                // }

                // if (now >= date24hours) {
                //   console.log("Less than 24 hours");
                // }

                // If the booking has already been accepted
                // We put back in the ride the seats available
                if (booking.BookingStatusId === 3) {
                  Ride.update(
                    {
                      seatsLeft: ride.seatsLeft + booking.seatsBooked,
                    },
                    {
                      where: {
                        id: booking.RideId,
                      },
                    }
                  ).catch((error) => {
                    consoleError(
                      fileName,
                      arguments.callee.name,
                      Error().stack,
                      error
                    );
                    return res.status(400).json(errorMessage);
                  });
                }

                return Booking.update(
                  {
                    BookingStatusId: 5,
                    commentPassenger: comment,
                  },
                  {
                    where: {
                      id: bookingId,
                    },
                  }
                )
                  .then((response) => {
                    // console.log(response);
                    res.status(200).json({ message: "OK", flag: "SUCCESS" });
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
                res.status(400).json({
                  message: "Ride not found",
                  flag: "RIDE_NOT_FOUND",
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
              res.status(400).json(errorMessage);
            });
        } else {
          res
            .status(400)
            .json({ message: "No booking found", flag: "NO_BOOKING_FOUND" });
        }
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },
};
