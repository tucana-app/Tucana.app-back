const dateFormat = require("dateformat");
const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function bookRideByUser(ride, seats) {
  const subject = "Resumen de la reserva - Booking summary";

  const text = `Tucána | 
  Tu solicitud de reserva ha sido enviada a ${ride.Driver.User.firstName}. 
  Reservaste ${seats} asiento(s) en el Ride por ${
    ride.Driver.User.firstName
  } de ${ride.origin.placeName} a ${ride.destination.placeName} el ${dateFormat(
    ride.dateTimeOrigin,
    "dd/mm/yyyy"
  )} a las ${dateFormat(ride.dateTimeOrigin, "hh:mm TT")}. 
  Your booking request has been sent to ${ride.Driver.User.firstName}.
  You booked ${seats} seat(s) on the ride by ${
    ride.Driver.User.firstName
  } from ${ride.origin.placeName} to ${
    ride.destination.placeName
  } on the ${dateFormat(ride.dateTimeOrigin, "dd/mm/yyyy")} at ${dateFormat(
    ride.dateTimeOrigin,
    "hh:mm TT"
  )}. Please wait for an answer from the driver. Note that your seats are not guaranteed until the driver confirms your booking.`;

  const html = emailHtmlTemplate({
    titleEN: `Your booking request has been sent to ${ride.Driver.User.firstName}`,
    textEN: `<p>You booked <strong>${seats}</strong> seat(s) on the ride by <strong>${
      ride.Driver.User.firstName
    }</strong> from <strong>${ride.origin.placeName}</strong> to <strong>${
      ride.destination.placeName
    }</strong> on the <strong>${dateFormat(
      ride.dateTimeOrigin,
      "dd/mm/yyyy"
    )}</strong> at <strong>${dateFormat(
      ride.dateTimeOrigin,
      "hh:mm TT"
    )}</strong></p>
    <p>Please wait for an answer from the driver. Note that your seats are not guaranteed until the driver confirms your booking.</p>`,
    titleES: `Tu solicitud de reserva ha sido enviada a ${ride.Driver.User.firstName}`,
    textES: `<p>Reservaste <strong>${seats}</strong> asiento(s) en el Ride por <strong>${
      ride.Driver.User.firstName
    }</strong> de <strong>${ride.origin.placeName}</strong> a <strong>${
      ride.destination.placeName
    }</strong> el <strong>${dateFormat(
      ride.dateTimeOrigin,
      "dd/mm/yyyy"
    )}</strong> a las <strong>${dateFormat(
      ride.dateTimeOrigin,
      "hh:mm TT"
    )}</strong></p>
    <p>Espere la respuesta del conductor. Tenga en cuenta que sus asientos no están garantizados hasta que el conductor confirme su reserva.</p>`,
  });

  return { subject, text, html };
};
