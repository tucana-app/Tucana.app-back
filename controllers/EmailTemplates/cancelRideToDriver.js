require("dotenv").config;
const dateFormat = require("dateformat");
const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function cancelRideToDriver(ride, reason) {
  const subject = "❌ Ride cancelado - Ride canceled";

  const text = `Tucána | 
  Has cancelado tu ride de ${ride.origin.placeName} a ${
    ride.destination.placeName
  } el ${dateFormat(ride.dateTimeOrigin, "dd/mm/yyyy")}. Motivo: "${reason}". 
  You have canceled your ride from ${ride.origin.placeName} to ${
    ride.destination.placeName
  } on the ${dateFormat(
    ride.dateTimeOrigin,
    "dd/mm/yyyy"
  )}. Reason: "${reason}".`;

  const html = emailHtmlTemplate({
    titleEN: `You canceled a ride`,
    textEN: `<p>You have canceled your ride from <strong>${
      ride.origin.placeName
    }</strong> to <strong>${
      ride.destination.placeName
    }</strong> on the <strong>${dateFormat(
      ride.dateTimeOrigin,
      "dd/mm/yyyy"
    )}</strong>.</p><p>Reason: "${reason}".</p>`,
    titleES: `Cancelaste un ride`,
    textES: `<p>Has cancelado tu ride de <strong>${
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
