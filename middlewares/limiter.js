const rateLimit = require('express-rate-limit');
const limiterOptions = require('../configs/limiterConfig');

const limiter = rateLimit(limiterOptions);

module.exports = limiter;