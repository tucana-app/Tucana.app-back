require("dotenv").config;

module.exports = function forgotPassword(UUID) {
  const subject = "Forgot your password | Tucána";
  const text = `Tucána | To create a new password, please click on this link: ${process.env.REACT_APP_URL_CLIENT}/create-new-password/${UUID}`;
  const html = `
      <div>
      <h1>Tucána</h1>
      <p>To create a new password, please <a href='${process.env.REACT_APP_URL_CLIENT}/create-new-password/${UUID}'>
      click on this link</a></p>
      <p>${process.env.REACT_APP_URL_CLIENT}/create-new-password/${UUID}</p>
      </div>
    `;

  return { subject, text, html };
};
