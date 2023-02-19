require("dotenv").config;
const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function forgotPassword(UUID) {
  const subject = "Contraseña olvidada - Forgot your password";
  const text = `Tucána | 
  Para crear una nueva contraseña, haga clic en este enlace: ${process.env.REACT_APP_URL_CLIENT}/new-password/${UUID} | 
  To create a new password, please click on this link: ${process.env.REACT_APP_URL_CLIENT}/new-password/${UUID}`;

  const html = emailHtmlTemplate({
    titleEN: `Link to reset your password`,
    textEN: `<p>To create a new password, please <a href='${process.env.REACT_APP_URL_CLIENT}/new-password/${UUID}' alt="" target="_blank">click on this link</a></p><p>If you cannot click the link above, then visit: ${process.env.REACT_APP_URL_CLIENT}/new-password/${UUID}</p>`,
    titleES: `Enlace para restablecer la contraseña`,
    textES: `<p>Para crear una nueva contraseña, haga <a href='${process.env.REACT_APP_URL_CLIENT}/new-password/${UUID}' alt="" target="_blank">clic en este enlace</a></p><p>Si no puedes hacer clic en el enlace anterior, visite: ${process.env.REACT_APP_URL_CLIENT}/new-password/${UUID}</p>.`,
  });

  return { subject, text, html };
};
