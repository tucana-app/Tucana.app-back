require("dotenv").config;

module.exports = function offerRide(ride) {
  const subject = "Your ride is online | Ride.CR";
  const text = `Your ride from ${ride.cityOrigin} to ${ride.cityDestination} with ${ride.seatsAvailable} seat(s) available is already online! You can already check it out on our platform at ${process.env.REACT_APP_URL_CLIENT}/find-ride`;
  const html = `
    <div>
    <p>Thank you!</p>
    <p>Yes, you are helping the community by sharing your seats</p>
    <p>Your ride from ${ride.cityOrigin} to ${ride.cityDestination} with ${ride.seatsAvailable} seat(s) available is already online! You can check it out on our platform at <a href="${process.env.REACT_APP_URL_CLIENT}/find-ride" alt="">${process.env.REACT_APP_URL_CLIENT}/find-ride</a></p>
    </div>
    `;

  return { subject, text, html };
};
