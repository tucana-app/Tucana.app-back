const dateFormat = require("dateformat");

module.exports = function refusedByDriver(booking) {
  const subject = "You have refused a booking | Ride.CR";
  const text = `You have refused the booking of ${
    booking.User.firstName
  } on your ride from ${booking.Ride.cityOrigin} to ${
    booking.Ride.cityDestination
  } (${dateFormat(booking.Ride.dateTime, "dd/mm/yyyy")})`;
  const html = `You have refused the booking of ${
    booking.User.firstName
  } on your ride from ${booking.Ride.cityOrigin} to ${
    booking.Ride.cityDestination
  } (${dateFormat(booking.Ride.dateTime, "dd/mm/yyyy")})`;

  return { subject, text, html };
};
