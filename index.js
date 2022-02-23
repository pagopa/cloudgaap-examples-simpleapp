const express = require("express");
const morgan = require("morgan");
const path = require("path");

const { makePGClient } = require("./clients/pg");
const { makeIndexRouter } = require("./routes");
const { makeCreateRouter } = require("./routes/create");
const { makeDeleteRouter } = require("./routes/delete");
const { makeReadRouter } = require("./routes/read.js");
const { makeUpdateRouter } = require("./routes/update");

const SERVER_PORT = process.env.PORT;
const CGAAP_BASE_PATH = process.env.CGAAP_BASE_PATH || "/";
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const PG_CONNECTION_STRING = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

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
    const router = express.Router();

    router.use(express.urlencoded({ extended: true }));

    router.use("/", makeIndexRouter(pgClient));
    router.use("/create", makeCreateRouter(pgClient));
    router.use("/read", makeReadRouter(pgClient));
    router.use("/update", makeUpdateRouter(pgClient));
    router.use("/delete", makeDeleteRouter(pgClient));

    app.use(CGAAP_BASE_PATH, router);

    // Start server
    app.listen(SERVER_PORT, () => {
      console.log(`Application started, listening on port ${SERVER_PORT}`);
    });
  })
  .catch((e) => console.log("Error starting the application", e));
