require("dotenv").config;
const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function beforeRide(ride) {
  const subject = "Tu Ride llega pronto - Your ride is coming up soon";

  const text = `Tucána | 
  Tu Ride a ${ride.destination.city} es en menos de 1 hora. Recuerde que siempre debe pagar al principio del trayecto, cuando se reúnan el conductor y el pasajero. Asegúrate de saber dónde están los puntos de recogida y entrega. Puedes utilizar la función de mensajería dentro de la aplicación. Disfrute de su viaje. 
  Your ride to ${ride.destination.city} is in less than 1 hour. Remember, always proceed with payment at the very beginning of the ride, when the driver & passenger(s) meet. Make sure you know where the pickup & drop-off points are. You can use the in-App messaging feature directly within the app. Enjoy your trip!`;

  const html = emailHtmlTemplate({
    titleEN: `Your ride to ${ride.destination.city} is in less than 1 hour.`,
    textEN: `<p>Remember, always proceed with the payment at the very beginning of the ride, when the driver & passenger(s) meet.</p>
    <p>Make also sure that you know where the pickup & drop-off points are. You can use the in-App messaging feature directly within the app</p>
    <p>Enjoy your trip!</p>`,
    titleES: `Tu viaje a ${ride.destination.city} es en menos de 1 hora`,
    textES: `<p>Recuerde que siempre debe pagar al principio del trayecto, cuando se reúnan el conductor y el pasajero.</p>
    <p>Asegúrate de saber dónde están los puntos de recogida y entrega. Puedes utilizar la función de mensajería dentro de la aplicación.</p>
    <p>¡Disfrute de su viaje!</p>`,
  });

  return { subject, text, html };
};
