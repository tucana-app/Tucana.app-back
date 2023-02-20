require("dotenv").config;
const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function passwordUpdated() {
  const subject = "Contraseña actualizada - Password updated";

  const text = `Tucána | 
  Tu contraseña se ha actualizado correctamente. 
  Your password has been updated successfully.`;

  const html = emailHtmlTemplate({
    titleEN: `Password updated`,
    textEN: `<p>Your password has been updated successfully.</p><p>If you are not the author of this request, please contact us immediately.</p>`,
    titleES: `Contraseña actualizada`,
    textES: `<p>Tu contraseña se ha actualizado correctamente.</p><p>Si tu no eres el autor de esta solicitud, póngate en contacto con nosotros inmediatamente.</p>`,
  });

  return { subject, text, html };
};
