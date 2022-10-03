require("dotenv").config;

module.exports = function becomeDriver(isAccepted, comment) {
  var subject, text, html;

  if (isAccepted) {
    subject = "You are now a driver | Tucána";
    text = `Tucána | Congratulations, you are now part of our community of drivers around Costa Rica. You can now publish rides.`;
    html = `
        <div>
        <h1>Tucána</h1>
        <p>Congratulations, you are now part of our community of drivers around Costa Rica.</p>
        <p>You can now publish rides.</p>
        </div>
      `;
  } else {
    subject = "Your application was rejected | Tucána";
    text = `Tucána | We are sorry to tell you that your application was rejected by our team. Reason: "${comment}". Please re-apply`;
    html = `
        <div>
        <h1>Tucána</h1>
        <p>We are sorry to tell you that your application was rejected by our team</p>
        <p>Reason: "${comment}".</p>
        <p>Please re-apply</p>
        </div>
      `;
  }

  return { subject, text, html };
};
