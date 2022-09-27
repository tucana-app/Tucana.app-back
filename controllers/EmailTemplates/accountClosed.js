require("dotenv").config;

module.exports = function accountClosed() {
  const subject = "Your account is closed | Tucána";
  const text = `Tucána | You have successfully closed your account. To access our platform again, you need to create another account, with a new username and a new email address.`;
  const html = `
      <div>
      <h1>Tucána</h1>
      <p>You have successfully closed your account</p>
      <p>To access our platform again, you need to create another account, with a new username and a new email address</p>
      <p>If you are not the author of this request, please contact us immediately</p>
      </div>
    `;
  return { subject, text, html };
};
