require("dotenv").config;

module.exports = function resetPasswordSuccess(user) {
  const subject = "Password reset successful | Tucána";
  const text = `Tucána | You have successfully reset your password. You can now login.`;
  const html = `
      <div>
      <h1>Tucána</h1>
      <p>You have successfully reset your password. You can now login</p>
      </div>
    `;
  return { subject, text, html };
};
