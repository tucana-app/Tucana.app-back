require("dotenv").config;

module.exports = function beforeRide(ride) {
  const subject = "Your ride is coming up soon | Tucána";
  const text = `Tucána | Your ride to ${ride.destination.city} is in 1 hour or less. Make sure you know where the pickup & drop-off points are. You can use the in-App messaging feature directly within the app. Remember, always proceed with payment at the very beginning of the ride, when driver & passenger(s) meet. Enjoy your trip!`;
  const html = `
      <div>
      <h1>Tucána</h1>
      <p>Your ride to ${ride.destination.city} is in 1 hour or less.
      <p>Remember, always proceed with payment at the very beginning of the ride, when driver & passenger(s) meet.</p>
      <p>Also, make sure you know where the pickup & drop-off points are. You can use the in-App messaging feature directly within the app</p>
      <p>Enjoy your trip!</p>
      </div>
    `;

  return { subject, text, html };
};
