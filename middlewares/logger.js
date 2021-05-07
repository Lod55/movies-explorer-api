const expressWinston = require('express-winston');
const {
  requestLoggerOptions,
  errorLoggerOptions,
} = require('../configs/index');

const requestLogger = expressWinston.logger(requestLoggerOptions);

const errorLogger = expressWinston.errorLogger(errorLoggerOptions);

module.exports = {
  requestLogger,
  errorLogger,
};
