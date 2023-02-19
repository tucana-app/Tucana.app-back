require("dotenv").config;
const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function rideFeedback(ride, isConfirmed) {
  var subject, text, html;

  if (isConfirmed) {
    subject = "✅ Ride completo - Ride complete";

    text = `Tucána | 
    Gracias por completar su ride. Por favor, vuelve a la aplicación y deja un comentario sobre ella para ayudar a mantener la seguridad de la plataforma. Recuerde que puede hacer una donación siguiendo el enlace: "https://fund.tucana.app". Considera dejarnos un comentario sobre nuestro servicio, en: "https://docs.google.com/forms/d/e/1FAIpQLSe5ryLUu84X7IELlLQO3XWfYajW4wj47Y-CkhVBQJsWGoh_4Q/viewform?usp=sf_link".
    Thank you for completing your ride. Please go back to the app and leave a review about it to help keep the platform secure. Remember that you can make a donation following the link: "fund.tucana.app". Consider leave us a feedback about our service, at: "https://docs.google.com/forms/d/e/1FAIpQLSe5ryLUu84X7IELlLQO3XWfYajW4wj47Y-CkhVBQJsWGoh_4Q/viewform?usp=sf_link".`;

    html = emailHtmlTemplate({
      titleEN: `You have completed the ride`,
      textEN: `<p>Thank you for completing your ride. Please go back to the app and leave a review about it to help keep the platform secure.</p>
      <p>Remember that you can make a donation following the link <a href="https://fund.tucana.app" alt="" target="_blank">https://fund.tucana.app</a>.</p><p>Consider leaving us a feedback about our service <a href="https://docs.google.com/forms/d/e/1FAIpQLSe5ryLUu84X7IELlLQO3XWfYajW4wj47Y-CkhVBQJsWGoh_4Q/viewform?usp=sf_link" alt="" target="_blank">by clicking here</a>.</p>`,
      titleES: `Has completado el ride`,
      textES: `<p>Gracias por completar su ride. Por favor, vuelve a la aplicación y deja un comentario sobre ella para ayudar a mantener la seguridad de la plataforma.</p>
      <p>Recuerde que puedes hacer una donación siguiendo el enlace <a href="https://fund.tucana.app" alt="" target="_blank">https://fund.tucana.app</a>.</p><p>Considera dejarnos un comentario sobre nuestro servicio, <a href="https://docs.google.com/forms/d/e/1FAIpQLSe5ryLUu84X7IELlLQO3XWfYajW4wj47Y-CkhVBQJsWGoh_4Q/viewform?usp=sf_link" alt="" target="_blank">haciendo clic aquí</a>.</p>`,
    });
  } else {
    subject = "❌ Ride rechaza - Ride rejected";

    text = `Tucána | 
    Lamentamos que tu ride no se haya realizado. Puede ponerse en contacto con nosotros para contarnos lo sucedido enviando un correo electrónico a "info@tucana.app". Considere la posibilidad de dejarnos comentarios sobre nuestro servicio, en "https://docs.google.com/forms/d/e/1FAIpQLSe5ryLUu84X7IELlLQO3XWfYajW4wj47Y-CkhVBQJsWGoh_4Q/viewform?usp=sf_link". 
    We are sorry to hear that your ride didn't happen. You can contact us to tell us about what happened by sending an email at "info@tucana.app". Consider leaving us feedback about our service, at "https://docs.google.com/forms/d/e/1FAIpQLSe5ryLUu84X7IELlLQO3XWfYajW4wj47Y-CkhVBQJsWGoh_4Q/viewform?usp=sf_link".`;

    html = emailHtmlTemplate({
      titleEN: `You claimed that the ride didn't take place`,
      textEN: `<p>We are sorry to hear that your ride didn't happen. You can contact us to tell us about what happened by sending an email at <a href="mailto:info@tucana.app" alt="">info@tucana.app</a></p><p>Consider leaving us a feedback about our service <a href="https://docs.google.com/forms/d/e/1FAIpQLSe5ryLUu84X7IELlLQO3XWfYajW4wj47Y-CkhVBQJsWGoh_4Q/viewform?usp=sf_link" alt="" target="_blank">by clicking here</a>.</p>`,
      titleES: `Afirmaste que el ride no tuvo lugar`,
      textES: `<p>Lamentamos que tu ride no se haya realizado. Puede ponerse en contacto con nosotros para contarnos lo sucedido enviando un correo electrónico a <a href="mailto:info@tucana.app" alt="">info@tucana.app</a>.</p><p>Consider leaving us a feedback about our service <a href="https://docs.google.com/forms/d/e/1FAIpQLSe5ryLUu84X7IELlLQO3XWfYajW4wj47Y-CkhVBQJsWGoh_4Q/viewform?usp=sf_link" alt="" target="_blank">by clicking here</a>.</p>`,
    });
  }

  return { subject, text, html };
};
