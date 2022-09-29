const updateRidesDone = require("./updateRidesDone");
const afterRide = require("./afterRide");

var CronJob = require("cron").CronJob;

// 0 0 0-23 * * * === everyHour
var job = new CronJob(
  "0 0 0-23 * * *",
  // "* * * * * *",
  () => {
    console.log(`\n\n
      ###########################
      #        CRONs START      #
      ############################\n\n`);

    updateRidesDone();
    // afterRide();
  },
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
//   updateRidesDone,
//   null,
//   true,
//   "America/Costa_Rica"
// );

job.start();
