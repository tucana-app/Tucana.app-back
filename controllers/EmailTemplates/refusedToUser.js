const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function refusedToUser(booking, formValues) {
  const subject = "Reserva rechazada - Booking refused";

  const text = `Tucána |
  Tu reserva del ride de ${booking.Ride.Driver.User.firstName} de ${booking.Ride.origin.city} a ${booking.Ride.destination.city} ha sido rechazada. Motivo: "${formValues.comment}".
  You booking of the ride by ${booking.Ride.Driver.User.firstName} from ${booking.Ride.origin.city} to ${booking.Ride.destination.city} has been refused. Reason: "${formValues.comment}".`;

  const html = emailHtmlTemplate({
    titleEN: `Your booking has been refused`,
    textEN: `<p>You booking of the ride by ${booking.Ride.Driver.User.firstName} from ${booking.Ride.origin.city} to ${booking.Ride.destination.city} has been refused.</p><p>Reason: "${formValues.comment}".</p>`,
    titleES: `Su reserva ha sido rechazada`,
    textES: `<p>Tu reserva del ride de ${booking.Ride.Driver.User.firstName} de ${booking.Ride.origin.city} a ${booking.Ride.destination.city} ha sido rechazada.</p><p>Motivo: "${formValues.comment}".</p>.`,
  });

  return { subject, text, html };
};
