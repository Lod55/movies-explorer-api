const {
  dataBaseUrl,
  urlRegEx,
  messages,
  secretKey,
} = require('./constantsConfig');
const corsOptions = require('./corsConfig');
const dataBaseOptions = require('./databaseConfig');
const limiterOptions = require('./limiterConfig');
const { requestLoggerOptions, errorLoggerOptions } = require('./loggerConfig');

module.exports = {
  dataBaseUrl,
  urlRegEx,
  messages,
  secretKey,
  corsOptions,
  dataBaseOptions,
  limiterOptions,
  requestLoggerOptions,
  errorLoggerOptions,
};
