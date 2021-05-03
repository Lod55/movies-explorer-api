const { NODE_ENV, DATABASE_URL } = process.env;

const dataBaseUrl =
  NODE_ENV === 'production' ? DATABASE_URL : 'mongodb://localhost:27017/bitfilmsdb';

const dataBaseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = {
  dataBaseUrl,
  dataBaseOptions,
}