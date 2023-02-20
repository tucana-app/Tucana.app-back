const dateFormat = require("dateformat");
const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function acceptedByDriver(booking) {
  const subject = "✅ Reserva aceptada - Booking accepted";

  const text = `Tucána | 
  Ha aceptado la reserva de ${booking.User.firstName} en su viaje de
  ${booking.Ride.origin.city} a ${booking.Ride.destination.city}
  (${dateFormat(booking.Ride.dateTimeOrigin, "dd/mm/yyyy")}). 
  You have accepted the booking of ${
    booking.User.firstName
  } on your ride from ${booking.Ride.origin.city} to ${
    booking.Ride.destination.city
  } (${dateFormat(booking.Ride.dateTimeOrigin, "dd/mm/yyyy")})`;

  const html = emailHtmlTemplate({
    titleEN: `You have accepted a booking`,
    textEN: `You have accepted the booking of ${
      booking.User.firstName
    } on your ride
    from ${booking.Ride.origin.city} to ${booking.Ride.destination.city}
    (${dateFormat(booking.Ride.dateTimeOrigin, "dd/mm/yyyy")})`,
    titleES: `Ha aceptado una reserva`,
    textES: `Ha aceptado la reserva de ${booking.User.firstName} en su viaje de
    ${booking.Ride.origin.city} a ${booking.Ride.destination.city}
    (${dateFormat(booking.Ride.dateTimeOrigin, "dd/mm/yyyy")})`,
  });

  return { subject, text, html };
};
