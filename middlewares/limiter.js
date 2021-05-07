const rateLimit = require('express-rate-limit');
const limiterOptions = require('../configs/index');

const limiter = rateLimit(limiterOptions);

module.exports = limiter;
