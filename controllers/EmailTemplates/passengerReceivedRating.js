require("dotenv").config;

module.exports = function passengerReceivedRating(driver) {
  const subject = "You have received a review | Tucána";
  const text = `Tucána | You have received a review from ${driver.firstName}, visit ${process.env.REACT_APP_URL_CLIENT}/profile/passenger/ratings`;
  const html = `
      <div>
      <h1>Tucána</h1>
      <p>You have received a review from ${driver.firstName}</p>
      <p><a href='${process.env.REACT_APP_URL_CLIENT}/profile/passenger/ratings'>Check it out now</a>
      </p>
      </div>
    `;

  return { subject, text, html };
};
