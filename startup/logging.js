const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function() {
  winston.configure({
    transports: [
      new winston.transports.File({ filename: "filelog.log" }),
      new winston.transports.Console({ colorize: true, prettyPrint: true }),
      new winston.transports.MongoDB({
        db: "mongodb://localhost/vidly",
        level: "error"
      })
    ]
  });

  // throw new Error("this is fucked up");

  // const p = Promise.reject(new Error("Mariusz fucked up"));
  // p.then(() => console.log("done"));

  process.on("unhandledRejection", ex => {
    console.log(ex);
    throw ex;
  });

  winston.exceptions.handle(
    new winston.transports.File({ filename: "exeptions.log" })
  );
};
