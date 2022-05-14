const dateFormat = require("dateformat");

module.exports = function contactToCompany(user, values) {
  const subject = `Tucána.app | Message from ${user.firstName} ${user.lastName}`;
  const text = `User ID: ${user.id} | 
  Fullname: ${user.firstName} ${user.lastName} | 
  Email: ${user.email} | 
  Message: ${values.message}`;
  const html = `<p>User ID: ${user.id}</p> 
  <p>Fullname: ${user.firstName} ${user.lastName}</p>
  <p>Email: ${user.email}</p>
  <p>Message: ${values.message}`;

  return { subject, text, html };
};
