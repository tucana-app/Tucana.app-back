require("dotenv").config;

module.exports = function admin_newFormBecomeDriver() {
  const subject = "New driver form submission | Tucána";
  const text = `Tucána | New driver submission form: ${process.env.REACT_APP_URL_ADMIN}/drivers-application`;
  const html = `
      <div>
      <h1>Tucána</h1>
      <p>New driver submission form: <a href='${process.env.REACT_APP_URL_ADMIN}/drivers-application'>Direct link</a></p>
      <p>${process.env.REACT_APP_URL_ADMIN}/drivers-application</p>
      </div>
    `;

  return { subject, text, html };
};
