const winston = require("winston");

function buildProdLogger() {
  const prodLogger = winston.createLogger({
    transports: [
      new winston.transports.File({ filename: "warn.log", level: "warn" }),
      new winston.transports.File({ filename: "error.log", level: "error" }),
    ],
  });
  return prodLogger;
}

function buildDevLogger() {
  const devLogger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "warn.log", level: "warn" }),
      new winston.transports.File({ filename: "error.log", level: "error" }),
    ],
  });
  return devLogger;
}

let logger = null;

if (process.env.NODE_ENV === "PROD") {
  logger = buildProdLogger();
} else {
  logger = buildDevLogger();
}

module.exports = logger;