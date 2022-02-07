const express = require("express");
const morgan = require("morgan");

const { makePGClient } = require("./clients/pg");
const { makeIndexRouter } = require("./routes");
const { makeCreateRouter } = require("./routes/create");
const { makeDeleteRouter } = require("./routes/delete");
const { makeReadRouter } = require("./routes/read.js");
const { makeUpdateRouter } = require("./routes/update");

const SERVER_PORT = process.env.PORT;
const PG_CONNECTION_STRING = process.env.PG_CONNECTION_STRING;

const pgClient = makePGClient(PG_CONNECTION_STRING);

pgClient
  .init()
  .then(() => {
    const app = express();

    // Configuring express template engine
    app.set("view engine", "pug");

    // Middlewares
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("dev"));

    // Routes
    app.use("/", makeIndexRouter(pgClient));
    app.use("/create", makeCreateRouter(pgClient));
    app.use("/read", makeReadRouter(pgClient));
    app.use("/update", makeUpdateRouter(pgClient));
    app.use("/delete", makeDeleteRouter(pgClient));

    // Start server
    app.listen(SERVER_PORT, () => {
      console.log(`Application started, listening on port ${SERVER_PORT}`);
    });
  })
  .catch((e) => console.log("Error starting the application", e));
