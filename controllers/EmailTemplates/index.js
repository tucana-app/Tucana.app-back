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
const becomeDriver = require("./becomeDriver");
const rideFeedback = require("./rideFeedback");
const newRating = require("./newRating");
const passengerReceivedRating = require("./passengerReceivedRating");
const driverRatingStatus = require("./driverRatingStatus");

// Admin emails
const admin_newFormBecomeDriver = require("./admin_newFormBecomeDriver");
const admin_newRating = require("./admin_newRating");
const admin_newRideRejected = require("./admin_newRideRejected");

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
  becomeDriver,
  rideFeedback,
  newRating,
  passengerReceivedRating,
  driverRatingStatus,

  // Admin emails
  admin_newFormBecomeDriver,
  admin_newRating,
  admin_newRideRejected,
};
