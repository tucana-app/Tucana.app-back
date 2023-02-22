require("dotenv").config;
const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function accountClosed() {
  const subject = "Cuenta cerrada - Account closed";

  const text = `Tucána | 
  Para volver a acceder a nuestra plataforma, debe crear otra cuenta, con un nuevo nombre de usuario y una nueva dirección de correo electrónico. Si no eres el autor de esta solicitud, ponte en contacto con nosotros inmediatamente.
  
  You have successfully closed your account. To access our platform again, you need to create another account, with a new username and a new email address.`;

  const html = emailHtmlTemplate({
    titleEN: `You have successfully closed your account`,
    textEN: `<p>To access our platform again, you need to create another account, with a new username and a new email address.</p><p>If you are not the author of this request, please contact us immediately.</p>`,
    titleES: `Has cerrado correctamente tu cuenta.`,
    textES: `<p>Para volver a acceder a nuestra plataforma, debe crear otra cuenta, con un nuevo nombre de usuario y una nueva dirección de correo electrónico.</p><p>Si no eres el autor de esta solicitud, ponte en contacto con nosotros inmediatamente.</p>`,
  });

  return { subject, text, html };
};
