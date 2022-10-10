// const dateFormat = require("dateformat");

module.exports = function bookingCanceledToUser(booking, comment) {
  const subject = `❌ You canceled the booking to ${booking.Ride.destination.city} | Tucána`;
  const text = `The booking for ${booking.seatsBooked} seat(s) has been canceld successfully. Reason: ${comment}. The driver has been notificed via email.`;
  const html = `<p>Tucána</p>
  <p>The booking for ${booking.seatsBooked} seat(s) has been canceld successfully.</p>
  <p>Reason: ${comment}.
  <p>The driver has been notificed via email</p>`;

  return { subject, text, html };
};
