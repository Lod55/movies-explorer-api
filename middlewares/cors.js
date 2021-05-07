const cors = require('cors');
const { corsOptions } = require('../configs/index');

const corsOrigin = cors(corsOptions);

module.exports = corsOrigin;
