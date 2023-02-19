// const dateFormat = require("dateformat");
const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function acceptedToUser(booking, formValues) {
  const subject = "✅ Reserva aceptada - Booking accepted";
  const text = `Su reserva para el viaje por ${booking.Ride.Driver.User.firstName} de ${booking.Ride.origin.city} a ${booking.Ride.destination.city} ha sido aceptada. Comentario del conductor: ${formValues.comment}.
  
  You booking for the ride by ${booking.Ride.Driver.User.firstName} from ${booking.Ride.origin.city} to ${booking.Ride.destination.city} has been accepted. Driver's comment: ${formValues.comment}`;

  const html = emailHtmlTemplate({
    titleEN: `${booking.Ride.Driver.User.firstName} has accepted your booking request!`,
    textEN: `You booking for the ride by ${booking.Ride.Driver.User.firstName} from ${booking.Ride.origin.city} to ${booking.Ride.destination.city} has been accepted. Driver's comment: ${formValues.comment}`,
    titleES: `${booking.Ride.Driver.User.firstName} ha aceptado/a tu solicitud de reserva.`,
    textES: `Su reserva para el viaje por ${booking.Ride.Driver.User.firstName} de ${booking.Ride.origin.city} a ${booking.Ride.destination.city} ha sido aceptada. Comentario del conductor: ${formValues.comment}`,
  });

  return { subject, text, html };
};
