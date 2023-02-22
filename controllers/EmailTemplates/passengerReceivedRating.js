require("dotenv").config;
const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function passengerReceivedRating(driver) {
  const subject = "Calificación recibida - Review received";

  const text = `Tucána | 
  ${driver.firstName} te ha dejado una calificación. Asegúrate de que tú también le has dejado una calificación. Si ya te ha dejado una reseña, no tienes que hacer nada. 
  ${driver.firstName} has left you a review. Make sure you left him/her a review too. If you have already left a review, you don't need to take any action.`;

  const html = emailHtmlTemplate({
    titleEN: `You have received a review`,
    textEN: `<p>${driver.firstName} left you a review. Make sure you left him/her a review too.</p><p>If you have already left a review, you don't need to take any action.</p>`,
    titleES: `Has recibido una calificación`,
    textES: `<p>${driver.firstName} te ha dejado una calificación. Asegúrate de que tú también le has dejado una calificación.</p><p>Si ya te ha dejado una reseña, no tienes que hacer nada.</p>.`,
  });

  return { subject, text, html };
};
