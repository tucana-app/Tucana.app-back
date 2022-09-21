require("dotenv").config;

module.exports = function admin_newRating() {
  const subject = "New rating submitted | Tucána";
  const text = `Tucána | New rating submitted`;
  const html = `
      <div>
      <h1>Tucána</h1>
      <p>New rating submitted</p>
      </div>
    `;

  return { subject, text, html };
};
