module.exports = function signupConfirmed(user) {
  const subject = "Sign up successful | Tucána";
  const text = `Welcome to Tucána ${user.firstName}. Now make sure to follow the tutorial from our page "How it works" in the help section on the menu. You can also directly login with your username (${user.username}) or email address at ${process.env.REACT_APP_URL_CLIENT}`;
  const html = `<div><h1>Tucána</h1>
  <p>Welcome to Tucána ${user.firstName}</p>
  <p>Now make sure to follow the tutorial from our page "<a href="${process.env.REACT_APP_URL_CLIENT}/how-it-works" alt="">How it works</a>" in the help section on the menu.</p>
  <p>You can also directly login with your username (${user.username}) or email address at <a href="${process.env.REACT_APP_URL_CLIENT}" alt="">${process.env.REACT_APP_URL_CLIENT}</a></p></div>
  `;

  return { subject, text, html };
};
