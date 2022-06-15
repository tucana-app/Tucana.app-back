require("dotenv").config;

module.exports = function newRating() {
  var subject, text, html;

  subject = "You have submitted a rating | Tucána";
  text = `Tucána | Thank you for submitting a rating. It is now in review and will be approved by a moderator shortly.`;
  html = `
        <div>
        <h1>Tucána</h1>
        <p>Thank you for submitting a rating.</p>
        <p>It is now in review and will be approved by a moderator shortly.</p>
        </div>
      `;

  return { subject, text, html };
};
