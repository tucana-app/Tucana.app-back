require("dotenv").config;
const dateFormat = require("dateformat");

module.exports = function reminderRatingToPassenger({ user, ride, booking }) {
  const subject = "Reminder to rate your ride | Tucána";
  const text = `Tucána | We would like to know more about your ride from ${
    ride.origin.city
  } to ${ride.destination.city} on the ${dateFormat(
    ride.dateTimeOrigin,
    "dd/mm/yyyy"
  )}. You can add your rating at ${process.env.REACT_APP_URL_CLIENT}/ratings/`;
  const html = `
      <div>
      <h1>Tucána</h1>
      <p>We would like to know more about your ride from ${
        ride.origin.city
      } to ${ride.destination.city} on the ${dateFormat(
    ride.dateTimeOrigin,
    "dd/mm/yyyy"
  )}
      </p>
      <p>
      You can add your rating at ${process.env.REACT_APP_URL_CLIENT}/ratings/
      </p>
      </div>
    `;
  return { subject, text, html };
};
