const winston = require('winston');

const requestLoggerOptions = {
  transports: [
    new winston.transports.File({ filename: './logs/request.log' }),
  ],
  format: winston.format.json(),
};

const errorLoggerOptions = {
  transports: [
    new winston.transports.File({ filename: './logs/error.log' }),
  ],
  format: winston.format.json(),
};

module.exports = {
  requestLoggerOptions,
  errorLoggerOptions,
}