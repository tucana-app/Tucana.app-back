require("dotenv").config;

module.exports = function admin_errorFrontEnd(message, stack) {
  const subject = "🟥 Error | Tucána";
  const text = `Tucána | Message: ${message} | Stack: ${stack}`;
  const html = `
      <div>
      <h1>Error</h1>
      <p>Message: ${message}</p>
      <p>Stack: ${stack}</p>
      </div>
    `;

  return { subject, text, html };
};
