// const dateFormat = require("dateformat");
const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function bookingCanceledToDriver(booking, comment) {
  const subject = `❌ Reserva anulada - Booking canceled`;

  const text = `Tucána | 
  La reserva de ${booking.seatsBooked} asiento(s) ha sido cancelada por ${booking.User.firstName}. Motivo: "${comment}". Hemos vuelto a poner los asientos en línea para que la gente los reserve.
  The booking for ${booking.seatsBooked} seat(s) has been canceled by ${booking.User.firstName}. Reason: "${comment}". We've put the seats back online for people to book them.`;

  const html = emailHtmlTemplate({
    titleEN: `❌ ${booking.User.firstName} canceled the booking to ${booking.Ride.destination.placeName}`,
    textEN: `<p>The booking by ${booking.User.firstName} for ${booking.seatsBooked} seat(s) has been canceled.</p>
    <p>Reason: "${comment}".</p>
    <p>We've put the seats back online for people to book them.</p>`,
    titleES: `❌ ${booking.User.firstName} canceló la reserva a ${booking.Ride.destination.placeName}`,
    textES: `<p>La reserva de ${booking.seatsBooked} asiento(s) ha sido cancelada por ${booking.User.firstName}.</p>
    <p>Motivo: "${comment}".</p>
    <p>Hemos vuelto a poner los asientos en línea para que la gente los reserve.</p>`,
  });

  return { subject, text, html };
};
