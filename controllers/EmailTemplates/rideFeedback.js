require("dotenv").config;

module.exports = function rideFeedback(ride, isConfirmed) {
  var subject, text, html;

  if (isConfirmed) {
    subject = "✅ You have confirmed the ride | Tucána";
    text = `Tucána | Thank you for confirming your ride. Please consider rating your ride here ${process.env.REACT_APP_URL_CLIENT}/ratings, to help make the platform more secure. Leave a feedback about Tucána following this link: https://forms.gle/Fi5ek3ZTATc1DcG36elp to help the community find out about the service we are offering`;
    html = `
        <div>
        <h1>Tucána</h1>
        <p>Thank you for confirming your ride. Please consider <a href='${process.env.REACT_APP_URL_CLIENT}/ratings'>rating your ride</a> to help make the platform more secure, .
        </p>
        <p>Leave a feedback about Tucána <a href='https://forms.gle/Fi5ek3ZTATc1DcG36'>following this link</a> to help the community find out about the service we are offering.
         </p>
        </div>
      `;
  } else {
    subject = "❌ You have rejected the ride | Tucána";
    text = `Tucána | We are sorry to hear that your ride didn't happened. Please contact us if you need to start a dispute here: ${process.env.REACT_APP_URL_CLIENT}/contact. In the meantime, consider rating your ride here ${process.env.REACT_APP_URL_CLIENT}/ratings. Help the community find out about the service we are offering by leaving a feedback about Tucána following this link: https://forms.gle/Fi5ek3ZTATc1DcG36`;
    html = `
        <div>
        <h1>Tucána</h1>
        <p>We are sorry to hear that your ride didn't happened. Please contact us if you need to <a href='${process.env.REACT_APP_URL_CLIENT}/contact'>start a dispute</a></p>
        <p>In the meantime, consider <a href='${process.env.REACT_APP_URL_CLIENT}/ratings'>rating your ride</a>.
        </p>
        <p>Leave a feedback about Tucána <a href='https://forms.gle/Fi5ek3ZTATc1DcG36'>following this link</a> to help the community find out about the service we are offering.
         </p>
        </div>
      `;
  }

  return { subject, text, html };
};
