const express = require("express");
const path = require("path");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const cors = require("cors");

const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const app = express();

  app.use(cors());

  // app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Answer API requests.
  require("./routes/user.routes")(app);
  require("./routes/admin.routes")(app);
  require("./routes/ride.routes")(app);
  require("./routes/email.routes")(app);
  require("./routes/message.routes")(app);
  require("./routes/rating.routes")(app);

  // Crons
  require("./crons");

  app.all("*", function (req, res) {
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
    );
    res.redirect(process.env.REACT_APP_URL_CLIENT);
  });

  app.listen(PORT, function () {
    console.error(
      `Node ${
        isDev ? "dev server" : "cluster worker " + process.pid
      }: listening on port ${PORT}`
    );
  });
}
