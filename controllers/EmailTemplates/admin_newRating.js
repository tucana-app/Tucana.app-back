require("dotenv").config;

module.exports = function admin_newRating() {
  const subject = "New rating submitted | Tucána";
  const text = `Tucána | New rating submitted: ${process.env.REACT_APP_URL_ADMIN}/ratings`;
  const html = `
      <div>
      <h1>Tucána</h1>
      <p>New rating submitted: <a href='${process.env.REACT_APP_URL_ADMIN}/ratings'>Direct link</a></p>
      <p>${process.env.REACT_APP_URL_ADMIN}/ratings</p>
      </div>
    `;

  return { subject, text, html };
};
