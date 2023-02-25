const dateFormat = require("dateformat");
const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function refusedByDriver(booking) {
  const subject = "Reserva rechazada - Booking refused";

  const text = `Tucána | 
  Has rechazado la reserva de ${booking.User.firstName} en tu ride de ${
    booking.Ride.origin.placeName
  } a ${booking.Ride.destination.placeName} (${dateFormat(
    booking.Ride.dateTimeOrigin,
    "dd/mm/yyyy"
  )})
  You have refused the booking of ${booking.User.firstName} on your ride from ${
    booking.Ride.origin.placeName
  } to ${booking.Ride.destination.placeName} (${dateFormat(
    booking.Ride.dateTimeOrigin,
    "dd/mm/yyyy"
  )})`;

  const html = emailHtmlTemplate({
    titleEN: `You have refused a booking`,
    textEN: `<p>You have refused the booking of ${
      booking.User.firstName
    } on your ride from ${booking.Ride.origin.placeName} to ${
      booking.Ride.destination.placeName
    } (${dateFormat(booking.Ride.dateTimeOrigin, "dd/mm/yyyy")})</p>`,
    titleES: `Has rechazado una reserva`,
    textES: `<p>Has rechazado la reserva de ${
      booking.User.firstName
    } en tu ride de ${booking.Ride.origin.placeName} a ${
      booking.Ride.destination.placeName
    } (${dateFormat(booking.Ride.dateTimeOrigin, "dd/mm/yyyy")})</p>.`,
  });

  return { subject, text, html };
};
