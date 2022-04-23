module.exports = function signupConfirmed(user) {
  const subject = "Sign up successful | Ride.CR";
  const text = `Welcome ${user.firstName} ${user.lastName} to our platform! You can now login with your username (${user.username}) or your email address at ${process.env.REACT_APP_URL_CLIENT}`;
  const html = `<div><h1>Ride.CR</h1>
  <p>Welcome to Ride.CR ${user.firstName} ${user.lastName}</p>
  <p>You can now login with your username (${user.username}) or your email address (${user.email}) at <a href="${process.env.REACT_APP_URL_CLIENT}" alt="">${process.env.REACT_APP_URL_CLIENT}</a></p></div>
  `;

  return { subject, text, html };
};
