const dateFormat = require("dateformat");
const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function contactToUser(values) {
  const subject = `Mensaje recibido - Message received`;

  const text = `Tucána | 
  Hemos recibido su mensaje. Haremos todo lo posible para responderle lo antes posible. 
  Datos enviados:
  Nombre completo: ${values.fullname} | 
  Asunto: ${values.subject} | 
  Mensaje:${values.message}. 
  Gracias por ponerse en contacto con nosotros.

  We have received your message. We will try our best to answer you as soon as possible. 
  Submitted data: 
  Fullname: ${values.fullname} | 
  Subject: ${values.subject} | 
  Message: ${values.message}. 
  Thank you for contacting us.`;

  const html = emailHtmlTemplate({
    titleEN: `Your message has been received`,
    textEN: `<p>We have received your message. We will try our best
    to answer you as soon as possible.</p>
    <p>Submitted data:</p>
    <p><u>Fullname</u>:<br />${values.fullname}</p>
    <p><u>Subject</u>:<br />${values.subject}</p>
    <p><u>Message</u>:<br />${values.message}</p>
    <br />
    <p><strong>Thank you for contacting us.</strong></p>`,
    titleES: `Su mensaje ha sido recibido`,
    textES: `<p>Hemos recibido su mensaje. Haremos todo lo posible para responderle lo antes posible.</p>
    <p>Submitted data:</p>
    <p><u>Nombre completo</u>:<br />${values.fullname}</p>
    <p><u>Asunto</u>:<br />${values.subject}</p>
    <p><u>Mensaje</u>:<br />${values.message}</p>
    <br />
    <p><strong>Gracias por ponerse en contacto con nosotros.</strong></p>`,
  });

  return { subject, text, html };
};
