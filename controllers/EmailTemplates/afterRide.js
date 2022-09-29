require("dotenv").config;

module.exports = function afterRide(ride) {
  const subject = "How was the ride? | Tucána";
  const text = `Tucána | We are curious to know how was the ride from ${ride.origin.city} to ${ride.destination.city}. Please confirm in the app if the ride took place or not. Then take the time to give the driver/passenger a review. You can also review our service filling up a feedback form`;
  const html = `
      <div>
      <h1>Tucána</h1>
      <p>We are curious to know how was the ride from ${ride.origin.city} to ${ride.destination.city}.</p>
      <p><strong>→ Please confirm in the app if the ride took place or not</strong></p>
      <p>→ Then take the time to give the driver/passenger a review.</p>
      <p>→ You can also review our service filling up a feedback form</p>
      </div>
    `;

  return { subject, text, html };
};
