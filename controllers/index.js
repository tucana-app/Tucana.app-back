const user = require("./user.controller");
const admin = require("./admin.controller");
const ride = require("./ride.controller");
const email = require("./email.controller");
const message = require("./message.controller");
const rating = require("./rating.controller");
const booking = require("./booking.controller");
const global = require("./global.controller");

module.exports = {
  user,
  admin,
  ride,
  email,
  message,
  rating,
  booking,
  global,
};
