require("dotenv").config;
const dateFormat = require("dateformat");
const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function publishRide(ride) {
  const subject = "Ride en línea - Ride online";

  const text = `Tucána | 
  Tu ride de ${ride.origin.city} a ${ride.destination.city} el ${dateFormat(
    ride.dateTimeOrigin,
    "dd/mm/yyyy"
  )} ya está en línea. Gracias por compartir tus asientos y ayudar a la comunidad a viajar.
  Your ride from ${ride.origin.city} to ${
    ride.destination.city
  } on the ${dateFormat(
    ride.dateTimeOrigin,
    "dd/mm/yyyy"
  )} is now online. Thank you for sharing your seats and helping the community to travel around.`;

  const html = emailHtmlTemplate({
    titleEN: `Your ride is published`,
    textEN: `<p>Your ride from <strong>${
      ride.origin.city
    }</strong> to <strong>${
      ride.destination.city
    }</strong> on the <strong>${dateFormat(
      ride.dateTimeOrigin,
      "dd/mm/yyyy"
    )}</strong> is now online.</p><p>Thank you for sharing your seats and helping the community to travel around.</p>`,
    titleES: `Tu ride está publicada`,
    textES: `<p>Tu ride de <strong>${ride.origin.city}</strong> a <strong>${
      ride.destination.city
    }</strong> el <strong>${dateFormat(
      ride.dateTimeOrigin,
      "dd/mm/yyyy"
    )}</strong> ya está en línea.</p><p>Gracias por ayudar a la comunidad a recorrer Costa Rica.</p>.`,
  });

  return { subject, text, html };
};
