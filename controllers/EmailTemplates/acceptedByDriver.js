const dateFormat = require("dateformat");

module.exports = function acceptedByDriver(booking) {
  const subject = "✅ You have accepted a booking | Ride.CR";
  const text = `You have accepted the booking of ${
    booking.User.firstName
  } on your ride from ${booking.Ride.cityOrigin} to ${
    booking.Ride.cityDestination
  } (${dateFormat(booking.Ride.dateTime, "dd/mm/yyyy")})`;
  const html = `You have accepted the booking of ${
    booking.User.firstName
  } on your ride from ${booking.Ride.cityOrigin} to ${
    booking.Ride.cityDestination
  } (${dateFormat(booking.Ride.dateTime, "dd/mm/yyyy")})`;

  return { subject, text, html };
};
