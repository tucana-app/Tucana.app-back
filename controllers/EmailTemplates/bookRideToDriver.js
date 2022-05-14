const dateFormat = require("dateformat");

module.exports = function bookRideToDriver(ride, passenger, formValues) {
  const subject = "You have a new booking | Tucána";
  const text = `Your ride from ${ride.origin.city} to ${
    ride.destination.city
  } (${dateFormat(
    ride.dateTime,
    "dd/mm/yyyy"
  )}) has a new booking! The passenger ${passenger.firstName} has requested ${
    formValues.seatsNeeded
  } seat(s). Accept or refuse the booking by clicking here: ${
    process.env.REACT_APP_URL_CLIENT
  }/ride/${ride.id}`;
  const html = `<div>
    <h1>
    Your ride from ${ride.origin.city} to ${
    ride.destination.city
  } (${dateFormat(ride.dateTime, "dd/mm/yyyy")}) has a new booking!</h1>
    <p>
    The passenger ${passenger.firstName} has requested ${
    formValues.seatsNeeded
  } seat(s). Accept or refuse the booking by <a href="${
    process.env.REACT_APP_URL_CLIENT
  }/ride/${ride.id}">clicking here</a> or visiting ${
    process.env.REACT_APP_URL_CLIENT
  }/ride/${ride.id}
    </p>
    </div>`;

  return { subject, text, html };
};
