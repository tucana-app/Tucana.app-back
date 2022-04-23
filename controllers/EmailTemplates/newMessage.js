require("dotenv").config;

module.exports = function newMessage() {
  const subject = "New Message | Ride.CR";
  const text = `Ride.CR | You have received a new message, visit ${process.env.REACT_APP_URL_CLIENT}/messages`;
  const html = `
      <div>
      <h1>Ride.CR</h1>
      <p>You have received a new message, visit <a href='${process.env.REACT_APP_URL_CLIENT}/messages'>
      ${process.env.REACT_APP_URL_CLIENT}/messages</a>
      </p>
      </div>
    `;

  return { subject, text, html };
};
