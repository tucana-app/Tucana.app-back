// const dateFormat = require("dateformat");

module.exports = function bookingCanceledToDriver(booking, comment) {
  const subject = `❌ ${booking.User.firstName} canceled the booking to ${booking.Ride.destination.city} | Tucána`;
  const text = `The booking for ${booking.seatsBooked} seat(s) has been canceld by ${booking.User.firstName}. Reason: ${comment}. We have put back your seats online for people to book your ride.`;
  const html = `<p>Tucána</p>
  <p>The booking by ${booking.User.firstName} for ${booking.seatsBooked} seat(s) has been canceld.</p>
  <p>Reason: ${comment}.
  <p>We have put your available seats online to find new passengers.</p>`;

  return { subject, text, html };
};
