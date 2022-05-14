const dateFormat = require("dateformat");

module.exports = function contactToUser(values) {
  const subject = `Your message has been received | Tucána`;
  const text = `Tucána |   
  We have received your message. We will try our best
  to answer you as soon as possible. Thank you for contacting us.
  Fullname: ${values.fullname}
  Message: ${values.message}`;
  const html = `<h1>Tucána</h1>
  <p>We have received your message. We will try our best
  to answer you as soon as possible. <br />Thank you for contacting us.</p>
  <p>Fullname: ${values.fullname}</p>
  <p>Message: ${values.message}</p>`;

  return { subject, text, html };
};
