const confirmSignup = require("./signup");
const forgotPassword = require("./forgotPassword");
const resetPasswordSuccess = require("./resetPasswordSuccess");
const reminderRatingToDriver = require("./reminderRatingToDriver");
const reminderRatingToPassenger = require("./reminderRatingToPassenger");
const offerRide = require("./offerRide");
const newMessage = require("./newMessage");
const acceptedByDriver = require("./acceptedByDriver");
const acceptedToUser = require("./acceptedToUser");
const bookRideByUser = require("./bookRideByUser");
const bookRideToDriver = require("./bookRideToDriver");
const refusedByDriver = require("./refusedByDriver");
const refusedToUser = require("./refusedToUser");
const signupConfirmed = require("./signupConfirmed");
const contactToCompany = require("./contactToCompany");
const contactToUser = require("./contactToUser");

module.exports = {
  confirmSignup,
  forgotPassword,
  resetPasswordSuccess,
  reminderRatingToDriver,
  reminderRatingToPassenger,
  offerRide,
  newMessage,
  acceptedByDriver,
  acceptedToUser,
  bookRideByUser,
  bookRideToDriver,
  refusedByDriver,
  refusedToUser,
  signupConfirmed,
  contactToCompany,
  contactToUser,
};
