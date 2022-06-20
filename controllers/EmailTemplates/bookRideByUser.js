const dateFormat = require("dateformat");

module.exports = function bookRideByUser(ride, seats) {
  const subject = "Summary of your booking | Tucána";
  const text = `You have made a booking request for ${seats} seats on the ride from ${
    ride.Driver.User.firstName
  } from ${ride.destination.city} to ${ride.origin.city} on the ${dateFormat(
    ride.dateTimeOrigin,
    "dd/mm/yyyy"
  )} at ${dateFormat(
    ride.dateTimeOrigin,
    "hh:mm TT"
  )}. You can check the ride again here: ${
    process.env.REACT_APP_URL_CLIENT
  }/ride/${ride.id}`;
  const html = `<div>
  <p>The booking request has been sent to ${ride.Driver.User.firstName}</p>
  <p>Now you just have to wait for a reply if the booking is confirmed</p>
  <div>
    <h3>Booking details</h3>
    <p>${seats} seats on the ride by ${ride.Driver.User.firstName} from ${
    ride.destination.city
  } to ${ride.origin.city} on the ${dateFormat(
    ride.dateTimeOrigin,
    "dd/mm/yyyy"
  )} at ${dateFormat(ride.dateTimeOrigin, "hh:mm TT")}</p>
  </div>
  `;

  return { subject, text, html };
};
