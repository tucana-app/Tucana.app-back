const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function signupConfirmed(user) {
  const subject = "Bienvenido/a a Tucána - Welcome to Tucána";

  const text = `Tucána | 
  Bienvenido/a a Tucána, ${user.firstName}. Ahora puedes iniciar sesión con tu nombre de usuario (${user.username}) o dirección de correo electrónico. Asegúrate de seguir nuestro rápido y sencillo tutorial para entender cómo funciona los Rides en Costa Rica y visita la sección de ayuda en el menú de la aplicación en cualquier momento. Síguenos en todas las plataformas de medios sociales. Ponte en contacto con nosotros en "info@tucana.app" si tienes alguna pregunta o sugerencia, o incluso si necesitas ayuda, nos encantaría ayudarte 🙂 
  Welcome to Tucána, ${user.firstName}. You can now login with your username (${user.username}) or email address. Make sure to follow our quick & easy tutorial to understand how carpooling works in Costa Rica and visit the help section on the app's menu at any time. Follow us on all social media platforms. Please contact us at "info@tucana.app" if you have any questions or suggestions, or even if you need help, we would love to help you 🙂`;

  const html = emailHtmlTemplate({
    titleEN: `Welcome to Tucána`,
    textEN: `<p>Welcome to Tucána, ${user.firstName}. You can now login with your username (${user.username}) or email address.</p><p>Make sure to follow our quick & easy tutorial to understand how carpooling works in Costa Rica and visit the help section on the app's menu at any time.</p><p>Follow us on all social media platforms.</p><p>Please contact us at <a href="mailto:info@tucana.app" alt="">info@tucana.app</a> if you have any questions or suggestions, or even if you need help, we would love to help you 🙂</p>`,
    titleES: `Bienvenido/a a Tucána`,
    textES: `<p>Bienvenido/a a Tucána, ${user.firstName}. Ahora puedes iniciar sesión con tu nombre de usuario (${user.username}) o dirección de correo electrónico.</p><p>Asegúrate de seguir nuestro rápido y sencillo tutorial para entender cómo funciona los Rides en Costa Rica y visita la sección de ayuda en el menú de la aplicación en cualquier momento.</p><p>Síguenos en todas las plataformas de medios sociales.</p><p>Ponte en contacto con nosotros en <a href="mailto:info@tucana.app" alt="">info@tucana.app</a> si tienes alguna pregunta o sugerencia, o incluso si necesitas ayuda, nos encantaría ayudarte 🙂</p>.`,
  });

  return { subject, text, html };
};
