// const dateFormat = require("dateformat");
const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function acceptedToUser(booking, formValues) {
  const subject = "✅ Reserva aceptada - Booking accepted";

  const text = `Tucána | 
  Su reserva para el viaje por ${booking.Ride.Driver.User.firstName} de ${booking.Ride.origin.placeName} a ${booking.Ride.destination.placeName} ha sido aceptada. Comentario del conductor: ${formValues.comment}. 
  You booking for the ride by ${booking.Ride.Driver.User.firstName} from ${booking.Ride.origin.placeName} to ${booking.Ride.destination.placeName} has been accepted. Driver's comment: ${formValues.comment}`;

  const html = emailHtmlTemplate({
    titleEN: `${booking.Ride.Driver.User.firstName} has accepted your booking request!`,
    textEN: `<p>You booking for the ride by ${booking.Ride.Driver.User.firstName} from ${booking.Ride.origin.placeName} to ${booking.Ride.destination.placeName} has been accepted.</p><p>Driver's comment: "${formValues.comment}".</p>`,
    titleES: `${booking.Ride.Driver.User.firstName} ha aceptado/a tu solicitud de reserva.`,
    textES: `<p>Su reserva para el viaje por ${booking.Ride.Driver.User.firstName} de ${booking.Ride.origin.placeName} a ${booking.Ride.destination.placeName} ha sido aceptada.</p><p>Comentario del conductor: "${formValues.comment}".</p>`,
  });

  return { subject, text, html };
};
