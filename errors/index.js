const UnauthorizedError = require('./unauthorized-err');
const BadRequestError = require('./bad-request-err');
const NotFoundError = require('./not-found-err');
const ConflictError = require('./conflict-err');
const ForbiddenError = require('./forbidden-err');

module.exports = {
  UnauthorizedError,
  BadRequestError,
  NotFoundError,
  ConflictError,
  ForbiddenError,
};
