require("dotenv").config;

module.exports = function admin_newFormBecomeDriver() {
  const subject = "New driver form submission | Tucána";
  const text = `Tucána | New driver submission form`;
  const html = `
      <div>
      <h1>Tucána</h1>
      <p>New driver submission form</p>
      </div>
    `;

  return { subject, text, html };
};
