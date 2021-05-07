const {
  NODE_ENV,
  DATABASE_URL,
  JWT_SECRET,
} = process.env;

const dataBaseUrl = NODE_ENV === 'production' ? DATABASE_URL : 'mongodb://localhost:27017/movie-explorer-db';
const urlRegEx = /^(https?:\/\/)(www\.)?([\da-z-.]+)\.([a-z.]{2,6})[\da-zA-Z-._~:?#[\]@!$&'()*+,;=/]*\/?#?$/;
const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

const messages = {
  models: {
    required: 'Данное поле обязательное',
    format: (type) => `Неправильный формат ${type}`,
    minLength: (num) => `Минимальное кол-во символов ${num}`,
    maxLength: (num) => `Максимальное кол-во символов ${num}`,
    unique: 'Поле должно быть уникальным',
  },
  authorization: {
    badDate: 'Неправильные почта или пароль',
    successfully: 'Авторизация прошла успешно!',
    unsuccessful: 'Необходимо авторизоваться!',
    fail: 'Авторизация не пройдена',
    status: {
      success: 'Пользователь авторизован!',
      failure: 'Пользователь не авторизован!',
    },
  },
  logout: 'Вы успешно разлогировались',
  badRequest: 'Переданы некорректные данные',
  user: {
    notFound: 'Пользователь по указанному _id не найден',
    conflict: 'Данный Email уже зарегистрирован',
  },
  movie: {
    conflict: 'Данный фильм уже добавлен',
    notFound: 'Фильм с указанным id не найден',
    forbidden: 'Фильм другого пользователя удалить нельзя!',
    delete: 'Фильм удалён',
  },
  server: {
    error: 'На сервере произошла ошибка',
    notFound: 'Данный запрос не найден',
  },
};

module.exports = {
  dataBaseUrl,
  urlRegEx,
  messages,
  secretKey,
};
