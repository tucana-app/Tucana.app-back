require("dotenv").config;

module.exports = function newMessage() {
  const subject = "New Message | Tucána";
  const text = `Tucána | You have received a new message`;
  const html = `
      <div>
      <h1>Tucána</h1>
      <p>You have received a new message</p>
      </div>
    `;

  return { subject, text, html };
};
