require("dotenv").config;
const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function becomeDriver(isAccepted, comment) {
  var subject, text, html;

  if (isAccepted) {
    subject = "Ya eres conductor - You are now a driver";

    text = `Tucána | 
    Felicidades, ahora eres parte de nuestra comunidad de conductores alrededor de Costa Rica. Ya puedes publicar viajes.
    Congratulations, you are now part of our community of drivers around Costa Rica. You can now publish rides.`;

    html = emailHtmlTemplate({
      titleEN: `Congratulations 🎉`,
      textEN: `<p>You are now part of our community of drivers around Costa Rica.</p>
      <p>You can now publish rides.</p>`,
      titleES: `Felicidades 🎉`,
      textES: `<p>Felicidades, ahora eres parte de nuestra comunidad de conductores alrededor de Costa Rica.</p>
      <p>Ya puedes publicar viajes.</p>`,
    });
  } else {
    subject = "Tu solicitud ha sido rechazada - Your application was rejected";

    text = `Tucána | 
    Lamentamos comunicarle que su solicitud ha sido rechazada por nuestro equipo. Motivo: "${comment}". Por favor, vuelva a solicitarlo.
    We are sorry to tell you that your application was rejected by our team. Reason: "${comment}". Please re-apply`;

    html = emailHtmlTemplate({
      titleEN: `Your application was rejected`,
      textEN: `<p>We are sorry to tell you that your application was rejected by our team</p>
      <p>Reason: "${comment}".</p>
      <p>Please re-apply</p>`,
      titleES: `Tu solicitud ha sido rechazada`,
      textES: `<p>Lamentamos comunicarle que su solicitud ha sido rechazada por nuestro equipo.</p>
      <p>Motivo: "${comment}".</p>
      <p>Por favor, vuelva a solicitarlo.</p>`,
    });
  }

  return { subject, text, html };
};
