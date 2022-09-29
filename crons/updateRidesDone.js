// https://www.npmjs.com/package/cron

const path = require("path");
const fileName = path.basename(__filename);

const db = require("../models");
const User = db.User;
const Driver = db.Driver;
const Ride = db.Ride;
const Op = db.Sequelize.Op;

const { consoleError, consoleCronStop } = require("../controllers/helpers");

module.exports = async function updateRidesDone() {
  const promise = await Ride.findAll({
    where: {
      dateTimeDestination: {
        [Op.lt]: new Date(),
      },
      // If the ride is NOT "Done" or greater
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
      // console.log(rides);

      if (rides) {
        // Mapping through the rides we found
        Promise.all(
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
                // Send an email to the passengers
                // and the driver to remind them
                // to rate the app and the other user
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
          })
        ).then((response) => consoleCronStop(fileName));
      }
    })
    .catch((error) => {
      consoleError(fileName, arguments.callee.name, Error().stack, error);
      consoleCronStop(fileName);
    });
};
