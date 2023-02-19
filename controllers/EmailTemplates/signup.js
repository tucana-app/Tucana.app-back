require("dotenv").config;
const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function confirmSignup(UUID) {
  const subject = "Confirme tu correo electrónico - Confirm your email address";

  const text = `Tucána | 
  Para acceder a nuestra plataforma, confirme tu dirección de correo electrónico siguiendo este enlace: ${process.env.REACT_APP_URL_CLIENT}/confirm/${UUID}. 
  To access our platform, please confirm your email address by visiting this page: ${process.env.REACT_APP_URL_CLIENT}/confirm/${UUID}`;

  const html = emailHtmlTemplate({
    titleEN: `Confirm your email address`,
    textEN: `<p>To access our platform, please confirm your email address <a href="${process.env.REACT_APP_URL_CLIENT}/confirm/${UUID}" alt="" target="_blank">by clicking here</a>.</p><p>If you cannot click the link above, then visit: ${process.env.REACT_APP_URL_CLIENT}/confirm/${UUID}.</p>`,
    titleES: `Confirme tu correo electrónico`,
    textES: `<p>Para acceder a nuestra plataforma, confirme tu dirección de correo electrónico <a href="${process.env.REACT_APP_URL_CLIENT}/confirm/${UUID}" alt="" target="_blank">haciendo clic aquí</a>.</p><p>Si no puedes hacer clic en el enlace anterior, visite: ${process.env.REACT_APP_URL_CLIENT}/confirm/${UUID}.</p>`,
  });

  return { subject, text, html };
};
