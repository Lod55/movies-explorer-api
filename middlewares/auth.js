const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/index');
const {
  messages,
  secretKey,
} = require('../configs/index');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorizedError(messages.authorization.unsuccessful);
  }

  let payload;

  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    const castError = new UnauthorizedError(messages.authorization.fail);
    next(castError);
  }

  req.user = payload;
  next();
};

module.exports = auth;
