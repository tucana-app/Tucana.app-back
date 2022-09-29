const afterRide = require("./afterRide");
const beforeRide = require("./beforeRide");
const reminderConfirm = require("./reminderConfirm");

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

    beforeRide();
    afterRide();
    // reminderConfirm();
  },
  null,
  true,
  "America/Costa_Rica"
);

// Executes only once
// setTimeout(() => {
//   job.stop();
// }, 1000);

job.start();
