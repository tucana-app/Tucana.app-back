require("dotenv").config;
const dateFormat = require("dateformat");
const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function reminderRating({ user, ride, booking }) {
  const subject = "Califique tu ride - Rate your ride";

  const text = `Tucána | 
  Nos gustaría saber más acerca de tu ride de ${ride.origin.placeName} a ${
    ride.destination.placeName
  } el ${dateFormat(
    ride.dateTimeOrigin,
    "dd/mm/yyyy"
  )}. Por favor, añade una calificación a la persona con la que viajaste. 
  We would like to know more about your ride from ${ride.origin.placeName} to ${
    ride.destination.placeName
  } on the ${dateFormat(
    ride.dateTimeOrigin,
    "dd/mm/yyyy"
  )}. Please add a rating to the person you traveled with.`;

  const html = emailHtmlTemplate({
    titleEN: `Reminder to rate your ride`,
    textEN: `<p>We would like to know more about your ride from ${
      ride.origin.placeName
    } to ${ride.destination.placeName} on the ${dateFormat(
      ride.dateTimeOrigin,
      "dd/mm/yyyy"
    )}. Please add a rating to the person you traveled with.</p>`,
    titleES: `Recordatorio para calificar  tu ride`,
    textES: `<p>Nos gustaría saber más acerca de tu ride de ${
      ride.origin.placeName
    } a ${ride.destination.placeName} el ${dateFormat(
      ride.dateTimeOrigin,
      "dd/mm/yyyy"
    )}. Por favor, añade una calificación a la persona con la que viajaste.</p>.`,
  });

  return { subject, text, html };
};
