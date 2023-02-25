const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function refusedToUser(booking, formValues) {
  const subject = "Reserva rechazada - Booking refused";

  const text = `Tucána |
  Tu reserva del ride de ${booking.Ride.Driver.User.firstName} de ${booking.Ride.origin.placeName} a ${booking.Ride.destination.placeName} ha sido rechazada. Motivo: "${formValues.comment}".
  You booking of the ride by ${booking.Ride.Driver.User.firstName} from ${booking.Ride.origin.placeName} to ${booking.Ride.destination.placeName} has been refused. Reason: "${formValues.comment}".`;

  const html = emailHtmlTemplate({
    titleEN: `Your booking has been refused`,
    textEN: `<p>You booking of the ride by ${booking.Ride.Driver.User.firstName} from ${booking.Ride.origin.placeName} to ${booking.Ride.destination.placeName} has been refused.</p><p>Reason: "${formValues.comment}".</p>`,
    titleES: `Su reserva ha sido rechazada`,
    textES: `<p>Tu reserva del ride de ${booking.Ride.Driver.User.firstName} de ${booking.Ride.origin.placeName} a ${booking.Ride.destination.placeName} ha sido rechazada.</p><p>Motivo: "${formValues.comment}".</p>.`,
  });

  return { subject, text, html };
};
