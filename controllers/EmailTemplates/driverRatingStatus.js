require("dotenv").config;

module.exports = function driverRatingStatus(isConfirmed, passenger, comment) {
  var subject, text, html;

  if (isConfirmed) {
    subject = "You rating has been approved | Tucána";
    text = `Tucána | We have reviewed your rating of ${passenger.firstName}, it has been approved. You can see it here: ${process.env.REACT_APP_URL_CLIENT}/profile/driver/ratings/. Thank you for keeping the community safe`;
    html = `
        <div>
        <h1>Tucána</h1>
        <p>We have reviewed your rating of ${passenger.firstName}, and it has been approved</p>
        <p><a href='${process.env.REACT_APP_URL_CLIENT}/profile/driver/ratings'>You can see it here</a></p>
        <p>Thank you for keeping the community safe</p>
        </div>
      `;
  } else {
    subject = "You rating has been rejected | Tucána";
    text = `Tucána | We have reviewed your rating of ${passenger.firstName}, and unfortunatly it has been rejected. Reason: "${comment}". You can see it here: ${process.env.REACT_APP_URL_CLIENT}/profile/driver/ratings/.`;
    html = `
        <div>
        <h1>Tucána</h1>
        <p>We have reviewed your rating of ${passenger.firstName}, and unfortunatly it has been rejected</p>
        <p>Reason: "${comment}"</p>
        <p><a href='${process.env.REACT_APP_URL_CLIENT}/profile/driver/ratings'>You can see it here</a></p>
        </div>
      `;
  }

  return { subject, text, html };
};
