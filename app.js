require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { dataBaseUrl, dataBaseOptions } = require('./utils');

const { PORT = 3000 } = process.env;
const app = express();

try {
mongoose.connect(dataBaseUrl, dataBaseOptions)
} catch (error) {
  console.log(`Ошибка поключения к БД: ${error}`);
}

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});