require("dotenv").config;
const dateFormat = require("dateformat");
const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function cancelRideToUser(ride, driver, reason) {
  const subject = "❌ Ride cancelado - Ride canceled";

  const text = `Tucána | 
  Sentimos comunicarle que ${driver.firstName} ha cancelado el ride de ${
    ride.origin.placeName
  } a ${ride.destination.placeName} el ${dateFormat(
    ride.dateTimeOrigin,
    "dd/mm/yyyy"
  )}. Motivo: "${reason}". 
  We are sorry to let you know that ${
    driver.firstName
  } canceled the ride from ${ride.origin.placeName} to ${
    ride.destination.placeName
  } on the ${dateFormat(
    ride.dateTimeOrigin,
    "dd/mm/yyyy"
  )}. Reason: "${reason}".`;

  const html = emailHtmlTemplate({
    titleEN: `Your ride got canceled`,
    textEN: `<p>We are sorry to let you know that ${
      driver.firstName
    } canceled the ride from <strong>${
      ride.origin.placeName
    }</strong> to <strong>${
      ride.destination.placeName
    }</strong> on the <strong>${dateFormat(
      ride.dateTimeOrigin,
      "dd/mm/yyyy"
    )}</strong>.</p><p>Reason: "${reason}".</p>`,
    titleES: `Tu ride fue cancelado`,
    textES: `<p>Sentimos comunicarle que ${
      driver.firstName
    } ha cancelado el ride de <strong>${
      ride.origin.placeName
    }</strong> a <strong>${
      ride.destination.placeName
    }</strong> el <strong>${dateFormat(
      ride.dateTimeOrigin,
      "dd/mm/yyyy"
    )}</strong>.</p><p>Motivo: "${reason}".</p>.`,
  });

  return { subject, text, html };
};
