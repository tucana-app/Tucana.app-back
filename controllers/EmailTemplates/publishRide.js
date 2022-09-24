require("dotenv").config;

module.exports = function publishRide(ride) {
  const subject = "Your ride is online | Tucána";
  const text = `Your ride from ${ride.origin.city} to ${ride.destination.city} with ${ride.seatsAvailable} seat(s) available is already online!`;
  const html = `
    <div>
    <p>Thank you for helping the community by sharing your seats</p>
    <p>Your ride from ${ride.origin.city} to ${ride.destination.city} with ${ride.seatsAvailable} seat(s) available is already online!</p>
    </div>
    `;

  return { subject, text, html };
};
