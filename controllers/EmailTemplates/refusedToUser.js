module.exports = function refusedToUser(booking, formValues) {
  const subject = "Your booking has been refused | Ride.CR";
  const text = `You booking for ride by ${booking.Ride.Driver.User.firstName} from ${booking.Ride.cityOrigin} to ${booking.Ride.cityDestination} has been refused. Reason: ${formValues.comment}`;
  const html = `You booking for ride by ${booking.Ride.Driver.User.firstName} from ${booking.Ride.cityOrigin} to ${booking.Ride.cityDestination} has been refused. Reason: ${formValues.comment}`;

  return { subject, text, html };
};
