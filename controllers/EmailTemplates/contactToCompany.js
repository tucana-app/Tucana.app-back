const dateFormat = require("dateformat");

module.exports = function contactToCompany(user, values) {
  const subject = `Message from ${user.firstName} ${user.lastName} | ${values.subject}`;
  const text = `User ID: ${user.id} | 
  Fullname: ${user.firstName} ${user.lastName} | 
  Email: ${user.email} | 
  Subject: ${values.subject} | 
  Message: ${values.message}`;
  const html = `<p>User ID: ${user.id}</p> 
  <p>Fullname: ${user.firstName} ${user.lastName}</p>
  <p>Email: ${user.email}</p>
  <p>Subject: ${values.subject}</p>
  <p>Message: ${values.message}</p>`;

  return { subject, text, html };
};
