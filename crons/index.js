// https://www.npmjs.com/package/cron

const db = require("../models");
const User = db.User;
const Driver = db.Driver;
const Ride = db.Ride;
const Op = db.Sequelize.Op;

// Not in use yet
const emailController = require("../controllers/email.controller");
const emailTemplates = require("../controllers/EmailTemplates");
const templateReminderRatingToPassenger = require("../controllers/EmailTemplates/reminderRatingToPassenger");
const templateReminderRatingToDriver = require("../controllers/EmailTemplates/reminderRatingToDriver");
const PassengerRating = db.PassengerRating;
const DriverRating = db.DriverRating;
const Booking = db.Booking;
const emailReminderRating = db.emailReminderRating;

var CronJob = require("cron").CronJob;

// Function
async function checkRidesDone() {
  console.log(`\n\n
    ####################
    # CRON IN PROGRESS #
    ####################\n\n`);

  const messageCronStop = `\n\n
  ####################
  # END OF THE CRON  #
  ####################\n\n`;

  let ride = await Ride.findAll({
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
                console.log(error);
                console.log(messageCronStop);
              });
          })
        ).then((response) => console.log(messageCronStop));
      }
    })
    .catch((error) => {
      console.log(error);
      console.log(messageCronStop);
    });
}

// Start the CRON
// 0 0 0-23 * * * === everyHour
var job = new CronJob(
  "0 0 0-23 * * *",
  checkRidesDone,
  null,
  true,
  "America/Costa_Rica"
);

// Executes only once
// setTimeout(() => {
//   job.stop();
// }, 1000);

// var job = new CronJob(
//   "* * * * * *",
//   checkRidesDone,
//   null,
//   true,
//   "America/Costa_Rica"
// );

job.start();
