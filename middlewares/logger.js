const expressWinston = require('express-winston');
const {requestLoggerOptions, errorLoggerOptions} = require('../configs/loggerConfig')

const requestLogger = expressWinston.logger(requestLoggerOptions);

const errorLogger = expressWinston.errorLogger(errorLoggerOptions);

module.exports = {
  requestLogger,
  errorLogger,
};