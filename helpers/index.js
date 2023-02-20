const updateExperienceUser = require("./updateExperienceUser");
const dateFormat = require("dateformat");

const { findPhoneNumbersInText } = require("libphonenumber-js");

// Returns an array of phone numbers if founds
const findPhones = (string) => findPhoneNumbersInText(string);

// Returns an array of emails if founds

const findEmails = (string) => {
  return string.match(
    /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi
  );
};

// Returns an array of links founds

const findLinks = (string) => {
  return string.match(
    /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/
  );
};

const consoleError = (file, fn, stack, error) => {
  return console.log(
    `\n\n #########\n\nERROR\n\n${file} - ${fn}()\n\nStack:\n${stack}\n\n${error}\n\n#########`
  );
};

const consoleCronStop = (fileName) => {
  console.log(`\n\n
      ###########################
      #                         #
      #         CRON END        #
      #                         #
      # ${fileName}
      #                         #
      # Date: ${dateFormat(new Date(), "dd/mm/yyyy")}        #
      # Time: ${dateFormat(new Date(), "hh:MM TT")}          #
      #                         #
      ###########################\n\n`);
};

const pointsGrid = {
  READ_MESSAGE: 1,
  NEW_MESSAGE: 2,
  ADD_BIO: 15,
  UPDATE_BIO: 5,
  BOOK_RIDE: 10,
  PUBLISH_RIDE: 20,
  ANSWER_BOOKING: 10,
  BECOME_DRIVER: 20,
  ADD_REVIEW: 10,
  CONFIRM_RIDE: 10,
  SET_CAR_FUEL: 2,
  SET_CAR_SEATS: 2,
  ADD_DATE_OF_BIRTH: 15,
};

// https://stackoverflow.com/questions/10804042/-time-difference-with-javascript/59793084#59793084

const DateDiff = (d1, d2) => {
  const diff = Math.max(d1, d2) - Math.min(d1, d2);
  const SEC = 1000,
    MIN = 60 * SEC,
    HRS = 60 * MIN,
    DYS = 24 * HRS;

  const dys = Math.floor(diff / DYS);
  const hrs = Math.floor(diff / HRS) - dys * 24;
  const min = Math.floor((diff % HRS) / MIN).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });

  //   const sec = Math.floor((diff % MIN) / SEC).toLocaleString("en-US", {
  //     minimumIntegerDigits: 2,
  //   });
  //   const ms = Math.floor(diff % SEC).toLocaleString("en-US", {
  //     minimumIntegerDigits: 4,
  //     useGrouping: false,
  //   });

  //   return `${hrs}:${min}:${sec}.${ms}`
  return { dys, hrs, min };
};

const getYearsDiff = (date1, date2) => {
  // convert both dates to milliseconds
  const date1Millis = date1.getTime();
  const date2Millis = date2.getTime();

  // calculate the difference in milliseconds
  const diffMillis = Math.abs(date2Millis - date1Millis);

  // convert milliseconds to years
  const millisPerYear = 1000 * 60 * 60 * 24 * 365.25; // 365.25 days in a year to account for leap years
  const diffYears = Math.floor(diffMillis / millisPerYear);

  return diffYears;
};

module.exports = {
  updateExperienceUser,
  pointsGrid,
  consoleError,
  consoleCronStop,
  DateDiff,
  findPhones,
  findEmails,
  findLinks,
  getYearsDiff,
};
