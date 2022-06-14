const dateFormat = require("dateformat");

module.exports = function refusedByDriver(booking) {
  const subject = "You have refused a booking | Tucána";
  const text = `You have refused the booking of ${
    booking.User.firstName
  } on your ride from ${booking.Ride.origin.city} to ${
    booking.Ride.destination.city
  } (${dateFormat(booking.Ride.dateTimeOrigin, "dd/mm/yyyy")})`;
  const html = `You have refused the booking of ${
    booking.User.firstName
  } on your ride from ${booking.Ride.origin.city} to ${
    booking.Ride.destination.city
  } (${dateFormat(booking.Ride.dateTimeOrigin, "dd/mm/yyyy")})`;

  return { subject, text, html };
};
