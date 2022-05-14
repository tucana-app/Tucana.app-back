const dateFormat = require("dateformat");

module.exports = function acceptedByDriver(booking) {
  const subject = "✅ You have accepted a booking | Tucána";
  const text = `You have accepted the booking of ${
    booking.User.firstName
  } on your ride from ${booking.Ride.origin.city} to ${
    booking.Ride.destination.city
  } (${dateFormat(booking.Ride.dateTime, "dd/mm/yyyy")})`;
  const html = `You have accepted the booking of ${
    booking.User.firstName
  } on your ride from ${booking.Ride.origin.city} to ${
    booking.Ride.destination.city
  } (${dateFormat(booking.Ride.dateTime, "dd/mm/yyyy")})`;

  return { subject, text, html };
};
