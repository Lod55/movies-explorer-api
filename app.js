require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const router = require('./routers');
const { dataBaseUrl, dataBaseOptions } = require('./configs/index');
const {
  errorHandler,
  corsOrigin,
  requestLogger,
  limiter,
  errorLogger,
} = require('./middlewares/index');

const { PORT = 3005 } = process.env;
const app = express();

try {
  mongoose.connect(dataBaseUrl, dataBaseOptions);
} catch (err) {
  errorHandler(err);
}

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(requestLogger);
app.use(corsOrigin);
app.use(limiter);
app.use(router);
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
