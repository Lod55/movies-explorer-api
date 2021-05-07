const { messages } = require('../configs/index');

const errorHandler = (err, req, res, next) => {
  const {
    statusCode = 500,
    message,
  } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? messages.server.error
        : message,
    });

  next();
};

module.exports = errorHandler;
