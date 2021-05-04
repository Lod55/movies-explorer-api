const cors = require('cors');
const corsOptions = require('../configs/corsConfig')

const crossOrigin = cors(corsOptions);

module.exports = crossOrigin;