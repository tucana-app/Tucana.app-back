const updateExperienceUser = require("./updateExperienceUser");

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
};

module.exports = {
  updateExperienceUser,
  pointsGrid,
  consoleError,
  findPhones,
  findEmails,
  findLinks,
};
