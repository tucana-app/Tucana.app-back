require("dotenv").config;

module.exports = function admin_newRideRejected() {
  const subject = "New ride rejected | Tucána";
  const text = `Tucána | New ride rejected`;
  const html = `
      <div>
      <h1>Tucána</h1>
      <p>New ride rejected</p>
      </div>
    `;

  return { subject, text, html };
};
