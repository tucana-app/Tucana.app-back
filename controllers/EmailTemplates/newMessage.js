require("dotenv").config;
const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function newMessage() {
  const subject = "Nuevo mensaje - New message";
  const text = `Tucána | You have received a new message`;

  const html = emailHtmlTemplate({
    titleEN: `New message`,
    textEN: `You have a new message. Go back to the app to see it.`,
    titleES: `Nuevo mensaje`,
    textES: `Tienes un nuevo mensaje. Vuelve a la aplicación para verlo.`,
  });

  return { subject, text, html };
};
