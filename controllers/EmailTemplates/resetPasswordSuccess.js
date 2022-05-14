require("dotenv").config;

module.exports = function resetPasswordSuccess(user) {
  const subject = "Password reset successful | Tucána";
  const text = `Tucána | You have successfully reset your password. You can now login here: ${process.env.REACT_APP_URL_CLIENT}/login`;
  const html = `
      <div>
      <h1>Tucána</h1>
      <p>You have successfully reset your password. You can now login <a href='${process.env.REACT_APP_URL_CLIENT}/login'>
      by clicking on this link</a> or copy-past the link ${process.env.REACT_APP_URL_CLIENT}/login
      </p>
      </div>
    `;
  return { subject, text, html };
};
