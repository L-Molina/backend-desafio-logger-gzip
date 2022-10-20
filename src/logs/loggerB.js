const log4js = require("log4js");

log4js.configure({
  appenders: {
    miLoggerConsole: { type: "console" },
    warnFile: { type: "file", filename: "warn.log" },
    errorFile: { type: "file", filename: "error.log" },
  },
  categories: {
    default: { appenders: ["miLoggerConsole"], level: "trace" },
    consola: { appenders: ["miLoggerConsole"], level: "debug" },
    archivo: { appenders: ["warnFile"], level: "warn" },
    archivo2: { appenders: ["errorFile"], level: "error" },
  },
});

//exportar logger
const logger = log4js.getLogger();
const loggerConsola = log4js.getLogger("consola");
const loggerWarn = log4js.getLogger("archivo");
const loggerError = log4js.getLogger("archivo2");

module.exports = { logger, loggerConsola, loggerWarn, loggerError };
