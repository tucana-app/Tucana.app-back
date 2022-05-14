require("dotenv").config;

module.exports = function confirmSignup(UUID) {
  const subject = "Confirm your email address | Tucána";
  const text = `Tucána | To access our platform, please confirm your email address following this link: ${process.env.REACT_APP_URL_CLIENT}/confirm/${UUID}`;
  const html = `
      <div>
      <h1>Tucána</h1>
      <p>To access our platform, please confirm your email address following this link: <a href='${process.env.REACT_APP_URL_CLIENT}/confirm/${UUID}'>
      confirm your email</a> or copy-past the link ${process.env.REACT_APP_URL_CLIENT}/confirm/${UUID}
      </p>
      </div>
    `;

  return { subject, text, html };
};
