require("dotenv").config;

module.exports = function admin_newUser() {
  const subject = "🎉 New user | Tucána";
  const text = `New user signed up`;
  const html = `
      <div>
      <h1>Tucána</h1>
      <p>New user signed up</p>
      </div>
    `;

  return { subject, text, html };
};
