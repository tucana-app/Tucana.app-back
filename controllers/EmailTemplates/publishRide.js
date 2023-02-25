require("dotenv").config;
const dateFormat = require("dateformat");
const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function publishRide(ride) {
  const subject = "Ride en línea - Ride online";

  const text = `Tucána | 
  Tu ride de ${ride.origin.placeName} a ${
    ride.destination.placeName
  } el ${dateFormat(
    ride.dateTimeOrigin,
    "dd/mm/yyyy"
  )} ya está en línea. Gracias por compartir tus asientos y ayudar a la comunidad a viajar.
  Your ride from ${ride.origin.placeName} to ${
    ride.destination.placeName
  } on the ${dateFormat(
    ride.dateTimeOrigin,
    "dd/mm/yyyy"
  )} is now online. Thank you for sharing your seats and helping the community to travel around.`;

  const html = emailHtmlTemplate({
    titleEN: `Your ride is published`,
    textEN: `<p>Your ride from <strong>${
      ride.origin.placeName
    }</strong> to <strong>${
      ride.destination.placeName
    }</strong> on the <strong>${dateFormat(
      ride.dateTimeOrigin,
      "dd/mm/yyyy"
    )}</strong> is now online.</p><p>Thank you for sharing your seats and helping the community to travel around.</p>`,
    titleES: `Tu ride está publicada`,
    textES: `<p>Tu ride de <strong>${
      ride.origin.placeName
    }</strong> a <strong>${
      ride.destination.placeName
    }</strong> el <strong>${dateFormat(
      ride.dateTimeOrigin,
      "dd/mm/yyyy"
    )}</strong> ya está en línea.</p><p>Gracias por ayudar a la comunidad a recorrer Costa Rica.</p>.`,
  });

  return { subject, text, html };
};
