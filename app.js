require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const router = require('./routers');
const limiter = require('./middlewares/limiter');
const corsOrigin = require('./middlewares/cors');
const { dataBaseUrl, dataBaseOptions } = require('./configs/databaseConfig');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

try {
  mongoose.connect(dataBaseUrl, dataBaseOptions);
} catch (err) {
  errorHandler(err);
}

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(corsOrigin);

app.use(requestLogger);
app.use(limiter);
app.use(router);
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
