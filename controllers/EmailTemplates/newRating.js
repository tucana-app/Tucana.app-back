require("dotenv").config;

module.exports = function newRating() {
  var subject, text, html;

  subject = "You have submitted a rating | Tucána";
  text = `Tucána | Thank you for submitting a rating. It is now under review by a moderator. You will receive the answer via email. If it gets accepted, you will be able to see your rating in the app in the left menu "Ratings".`;
  html = `
        <div>
        <h1>Tucána</h1>
        <p>Thank you for submitting a rating, it is now under review by a moderator.</p>
        <p>You will receive the answer via email. If it gets accepted, you will be able to see your rating in the app in the left menu "Ratings"</p>
        </div>
      `;

  return { subject, text, html };
};
