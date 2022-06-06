require("dotenv").config;

module.exports = function newFormBecomeDriver() {
  const subject = "New driver form submission | Tucána";
  const text = `Tucána | New driver submission form. ${process.env.REACT_APP_URL_ADMIN}`;
  const html = `
      <div>
      <h1>Tucána</h1>
      <p>New driver submission form. <a href='${process.env.REACT_APP_URL_ADMIN}/'>
      ${process.env.REACT_APP_URL_ADMIN}</a></p>
      <p>${process.env.REACT_APP_URL_ADMIN}</p>
      </div>
    `;

  return { subject, text, html };
};
