// const dateFormat = require("dateformat");
const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function bookingCanceledToUser(booking, comment) {
  const subject = `❌ Reserva anulada - Booking canceled`;

  const text = `Tucána | 
  Su reserva para ${booking.seatsBooked} asiento(s) ha sido cancelada con éxito. Motivo: "${comment}". El conductor ha sido notificado por correo electrónico.
  Your booking for ${booking.seatsBooked} seat(s) has been canceled successfully. Reason: "${comment}". The driver has been notified via email.`;

  const html = emailHtmlTemplate({
    titleEN: `❌ Your booking for ${booking.seatsBooked} seat(s) has been canceled successfully`,
    textEN: `<p>Reason: "${comment}".</p>
    <p>The driver has been notified via email.</p>`,
    titleES: `❌ Su reserva para ${booking.seatsBooked} asiento(s) ha sido cancelada con éxito`,
    textES: `<p>Motivo: "${comment}".</p>
    <p>El conductor ha sido notificado por correo electrónico.</p>`,
  });

  return { subject, text, html };
};
