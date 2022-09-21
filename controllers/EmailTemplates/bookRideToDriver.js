const dateFormat = require("dateformat");

module.exports = function bookRideToDriver(ride, passenger, seats) {
  const subject = "You have a new booking | Tucána";
  const text = `Your ride from ${ride.origin.city} to ${
    ride.destination.city
  } (${dateFormat(
    ride.dateTimeOrigin,
    "dd/mm/yyyy"
  )}) has a new booking! The passenger ${
    passenger.firstName
  } has requested ${seats} seat(s). You can accept or refuse the booking`;
  const html = `<div>
    <h1>
    Your ride from ${ride.origin.city} to ${
    ride.destination.city
  } (${dateFormat(ride.dateTimeOrigin, "dd/mm/yyyy")}) has a new booking!</h1>
    <p>
    The passenger ${
      passenger.firstName
    } has requested ${seats} seat(s). You can accept or refuse the booking</p>
    </div>`;

  return { subject, text, html };
};
