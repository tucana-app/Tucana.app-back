require("dotenv").config;

module.exports = function passengerReceivedRating(driver) {
  const subject = "You have received a review | Tucána";
  const text = `Tucána | You have received a review from ${driver.firstName}`;
  const html = `
      <div>
      <h1>Tucána</h1>
      <p>You have received a review from ${driver.firstName}</p>
      </div>
    `;

  return { subject, text, html };
};
