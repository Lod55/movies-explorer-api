const {
  deleteMovieValidator,
  createMovieValidator,
} = require('./validators/moviesValidators');
const {
  createUserValidator,
  loginValidator,
  updateUserValidator,
} = require('./validators/usersValidators');
const auth = require('./auth');
const corsOrigin = require('./cors');
const errorHandler = require('./error-handler');
const limiter = require('./limiter');
const { requestLogger, errorLogger } = require('./logger');

module.exports = {
  deleteMovieValidator,
  createMovieValidator,
  createUserValidator,
  loginValidator,
  updateUserValidator,
  auth,
  corsOrigin,
  errorHandler,
  limiter,
  requestLogger,
  errorLogger,
};
