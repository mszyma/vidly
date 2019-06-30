const express = require("express");
const app = express();
const winston = require("winston");

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

// eslint-disable-next-line no-undef
const port = process.env.port || 3000;
// eslint-disable-next-line no-console
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}`)
);

module.exports = server;
