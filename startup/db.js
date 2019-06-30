const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");

module.exports = function() {
  mongoose.set("useCreateIndex", true);
  mongoose
    .connect(config.get("db"), { useNewUrlParser: true })
    // eslint-disable-next-line no-console
    .then(() => winston.info(`Connected to ${config.get("db")} ...`));
  // eslint-disable-next-line no-console
};
