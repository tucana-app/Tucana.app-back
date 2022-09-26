require("dotenv").config;

module.exports = function passwordUpdated() {
  const subject = "Password updated successful | Tucána";
  const text = `Tucána | Your password has been updated.`;
  const html = `
      <div>
      <h1>Tucána</h1>
      <p>Your password has been updated</p>
      <p>If you are not the author of this request, please contact us immediately</p>
      </div>
    `;
  return { subject, text, html };
};
