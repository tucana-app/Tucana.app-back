// const dateFormat = require("dateformat");

module.exports = function acceptedToUser(booking, formValues) {
  const subject = "✅ Your booking has been accepted | Tucána";
  const text = `You booking for the ride by ${booking.Ride.Driver.User.firstName} from ${booking.Ride.origin.city} to ${booking.Ride.destination.city} has been accepted. Driver's comment: ${formValues.comment}`;
  const html = `You booking for the ride by ${booking.Ride.Driver.User.firstName} from ${booking.Ride.origin.city} to ${booking.Ride.destination.city} has been accepted. Driver's comment: ${formValues.comment}`;

  return { subject, text, html };
};
