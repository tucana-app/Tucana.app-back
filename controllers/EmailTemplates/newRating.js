require("dotenv").config;
const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function newRating() {
  const subject = "Calificación enviada - Rating submitted";
  const text = `Tucána | 
  Gracias por enviar una calificación. Ahora está siendo revisada por un moderador. Recibirás la respuesta por correo electrónico. Si es aceptada, podrás ver tu valoración en la aplicación, en el menú de la izquierda "Calificaciónes". 
  Thank you for submitting a rating. It is now under review by a moderator. You will receive the answer via email. If it gets accepted, you will be able to see your rating in the app in the left menu "Ratings".`;

  const html = emailHtmlTemplate({
    titleEN: `You have submitted a rating`,
    textEN: `<p>Thank you for submitting a rating. It is now under review by a moderator. You will receive the answer via email.</p><p>If it gets accepted, you will be able to see your rating in the app in the left menu "Ratings".</p>`,
    titleES: `Ha enviado una calificación`,
    textES: `<p>Gracias por enviar una calificación. Ahora está siendo revisada por un moderador. Recibirás la respuesta por correo electrónico.</p><p>Si es aceptada, podrás ver tu valoración en la aplicación, en el menú de la izquierda "Calificaciónes".</p>.`,
  });

  return { subject, text, html };
};
