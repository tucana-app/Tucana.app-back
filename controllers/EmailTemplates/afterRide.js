require("dotenv").config;
const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function afterRide(ride) {
  const subject = "¿Cómo fue tu viaje? - How was your ride?";
  const text = `Tucána | 
  Tenemos curiosidad por saber cómo fue el ride de ${ride.origin.city} a ${
    ride.destination.city
  } (${dateFormat(
    ride.dateTimeOrigin,
    "dd/mm/yyyy"
  )}). A continuación, tómese su tiempo para escribir una opinión sobre el conductor/pasajero. También puede opinar sobre nuestro servicio rellenando el formulario de opinión: https://docs.google.com/forms/d/e/1FAIpQLSe5ryLUu84X7IELlLQO3XWfYajW4wj47Y-CkhVBQJsWGoh_4Q/viewform?usp=sf_link. 
  We are curious to know how was the ride from ${ride.origin.city} to ${
    ride.destination.city
  } (${dateFormat(
    ride.dateTimeOrigin,
    "dd/mm/yyyy"
  )}). In the app, complete it by letting us know if it took place or not. Then take the time to give the driver/passenger a review. You can also review our service by filling up a feedback form: https://docs.google.com/forms/d/e/1FAIpQLSe5ryLUu84X7IELlLQO3XWfYajW4wj47Y-CkhVBQJsWGoh_4Q/viewform?usp=sf_link`;

  const html = emailHtmlTemplate({
    titleEN: `How was your ride from ${ride.origin.city} to ${
      ride.destination.city
    } (${dateFormat(ride.dateTimeOrigin, "dd/mm/yyyy")})?`,
    textEN: `<ul><li>In the app, complete it by letting us know if it took place or not</li>
    <li>Then take the time to give the driver/passenger a review.</li>
    <li>You can also review our service by filling up a <a href="https://docs.google.com/forms/d/e/1FAIpQLSe5ryLUu84X7IELlLQO3XWfYajW4wj47Y-CkhVBQJsWGoh_4Q/viewform?usp=sf_link" alt="Feedback link" target="_blank">feedback form</a></li>
    </ul>`,
    titleES: `¿Cómo fue tu viaje de ${ride.origin.city} a ${
      ride.destination.city
    } (${dateFormat(ride.dateTimeOrigin, "dd/mm/yyyy")})?`,
    textES: `<ul><li>En la aplicación, indíquenos si ha tenido lugar o no.</li>
    <li>A continuación, tómese su tiempo para escribir una opinión sobre el conductor/pasajero.</li>
    <li>También puede opinar sobre nuestro servicio rellenando un <a href="https://docs.google.com/forms/d/e/1FAIpQLSe5ryLUu84X7IELlLQO3XWfYajW4wj47Y-CkhVBQJsWGoh_4Q/viewform?usp=sf_link" alt="Feedback link" target="_blank">formulario de opinión</a></li>
    </ul>`,
  });

  return { subject, text, html };
};
