require("dotenv").config;

module.exports = function offerRide(ride) {
  const subject = "Your ride is online | Tucána";
  const text = `Your ride from ${ride.origin.city} to ${ride.destination.city} with ${ride.seatsAvailable} seat(s) available is already online! You can already check it out on our platform at ${process.env.REACT_APP_URL_CLIENT}/rides/driver`;
  const html = `
    <div>
    <p>Thank you!</p>
    <p>Yes, you are helping the community by sharing your seats</p>
    <p>Your ride from ${ride.origin.city} to ${ride.destination.city} with ${ride.seatsAvailable} seat(s) available is already online! You can check it out on our platform <a href="${process.env.REACT_APP_URL_CLIENT}/ride/${ride.id}" alt="">by clicking here </a></p>
    </div>
    `;

  return { subject, text, html };
};
