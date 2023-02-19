const dateFormat = require("dateformat");
const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function bookRideToDriver(ride, passenger, seats) {
  const subject = "☀ Nueva reserva - New booking";
  const text = `Tucána | 
  El/la pasenjero/a ${
    passenger.firstName
  } ha solicitado ${seats} asiento(s) por tu viaje a ${
    ride.destination.city
  } en el ${dateFormat(
    ride.dateTimeOrigin,
    "dd/mm/yyyy"
  )}. Acepta o rechaza la reserva en la app.

  The passenger ${
    passenger.firstName
  } has requested <strong>${seats}</strong> seat(s) on your ride to ${
    ride.destination.city
  } on the ${dateFormat(
    ride.dateTimeOrigin,
    "dd/mm/yyyy"
  )}. Accept or refuse the booking within the app.`;

  const html = emailHtmlTemplate({
    titleEN: `${passenger.firstName} wants to travel with you`,
    textEN: `<p>The passenger has requested <strong>${seats}</strong> seat(s) on your ride to ${
      ride.destination.city
    } on the ${dateFormat(
      ride.dateTimeOrigin,
      "dd/mm/yyyy"
    )}.</p><p>Accept or refuse the booking within the app.</p>`,
    titleES: `${passenger.firstName} quiere viajar contigo`,
    textES: `<p>El/la pasenjero/a ha solicitado <strong>${seats}</strong> asiento(s) por tu viaje a ${
      ride.destination.city
    } en el ${dateFormat(
      ride.dateTimeOrigin,
      "dd/mm/yyyy"
    )}. Acepta o rechaza la reserva en la app.</p>`,
  });

  return { subject, text, html };
};
