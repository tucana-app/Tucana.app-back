require("dotenv").config;

module.exports = function becomeDriver(isAccepted, comment) {
  var subject, text, html;

  if (isAccepted) {
    subject = "You are now a driver | Tucána";
    text = `Tucána | Congratulations, you are now part of our community of drivers around Costa Rica. Please activate your driver's profile here: ${process.env.REACT_APP_URL_CLIENT}/become-driver`;
    html = `
        <div>
        <h1>Tucána</h1>
        <p>Congratulations, you are now part of our community of drivers around Costa Rica. Please activate your driver's profile by <a href='${process.env.REACT_APP_URL_CLIENT}/become-driver'>clicking here</a>
        </p>
        <p>${process.env.REACT_APP_URL_CLIENT}/become-driver</p>
        </div>
      `;
  } else {
    subject = "Your application was rejected | Tucána";
    text = `Tucána | We are sorry to tell you that your application was rejected by our team. Reason: "${comment}". Please re-apply here: ${process.env.REACT_APP_URL_CLIENT}/become-driver`;
    html = `
        <div>
        <h1>Tucána</h1>
        <p>We are sorry to tell you that your application was rejected by our team</p>
        <p>Reason: "${comment}".</p>
        <p>Please <a href='${process.env.REACT_APP_URL_CLIENT}/become-driver'>
        re-apply here</a>
        </p>
        <p>${process.env.REACT_APP_URL_CLIENT}/become-driver</p>
        </div>
      `;
  }

  return { subject, text, html };
};
