require("dotenv").config;

module.exports = function admin_newRide() {
  const subject = "🚗 New ride | Tucána";
  const text = `New ride published`;
  const html = `
      <div>
      <h1>Tucána</h1>
      <p>New ride published</p>
      </div>
    `;

  return { subject, text, html };
};
