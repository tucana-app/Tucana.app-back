require("dotenv").config;
const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function driverRatingStatus(isConfirmed, passenger, comment) {
  var subject, text, html;

  if (isConfirmed) {
    subject = "👍 Calificación aprobada - Rating approved";

    text = `Tucána | 
    Hemos revisado tu valoración de ${passenger.firstName}, ha sido aprobada. Gracias por mantener la seguridad de la comunidad. 
    We have reviewed your rating of ${passenger.firstName}, it has been approved. Thank you for keeping the community safe`;

    html = emailHtmlTemplate({
      titleEN: `Your rating has been approved`,
      textEN: `<p>We have reviewed your rating of ${passenger.firstName}, and it has been approved. Thank you for keeping the community safe.</p>`,
      titleES: `Su calificación ha sido aprobada`,
      textES: `<p>Hemos revisado tu valoración de ${passenger.firstName}, ha sido aprobada. Gracias por mantener la seguridad de la comunidad.</p>`,
    });
  } else {
    subject = "👎 Calificación rechazada - Rating rejected";

    text = `Tucána | 
    Hemos revisado tu valoración de ${passenger.firstName}, y desafortunadamente, ha sido rechazada. Razón: "${comment}". 
    We have reviewed your rating of ${passenger.firstName}, and unfortunately it has been rejected. Reason: "${comment}".`;

    html = emailHtmlTemplate({
      titleEN: `Your rating has been rejected`,
      textEN: `<p>We have reviewed your rating of ${passenger.firstName}, and unfortunately it has been rejected.</p>
      <p>Reason: "${comment}".</p>`,
      titleES: `Su calificación ha sido rechazada`,
      textES: `<p>Hemos revisado tu valoración de ${passenger.firstName}, y desafortunadamente, ha sido rechazada.</p>
      <p>Razón: "${comment}".</p>.`,
    });
  }

  return { subject, text, html };
};
