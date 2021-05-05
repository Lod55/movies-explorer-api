const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const CastError = require('../errors/cast-err');

const createUser = (req, res, next) => {
  const data = { ...req.body };

  if (!data.email || !data.password || !data.name) {
    throw new CastError('Переданы некорректные данные при создании юзера.', 400);
  }

  bcrypt.hash(data.password, 10)
    .then((hash) => User.create({ ...data, password: hash }))
    .then((user) => res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const massage = `${Object.values(err.errors).map((el) => el.message).join(', ')}`;
        const errorCustom = new CastError(massage, 400);
        next(errorCustom);
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        const errorCustom = new CastError('Данный Email уже зарегистрирован', 409);
        next(errorCustom);
      }
      if (err.code === 500) {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const data = { ...req.body };

  if (!data.email || !data.password) {
    throw new CastError('Переданы некорректные данные.', 400);
  }

  return User.findUserByCredentials(data.email, data.password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '24h' },
      );

      res.cookie(
        'jwt',
        token,
        { maxAge: 3600000 * 24, httpOnly: true, sameSite: true },
      )
        .send({ message: 'Авторизация прошла успешно!' });
    })
    .catch(next);
};

const signOut = (req, res) => {
  res.clearCookie('jwt').send({ message: 'cookie удалена!' });
};

const successfulAuth = (req, res) => {
  res.send({ massege: 'Пользователь авторизован!' });
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new CastError('Вы не авторизованы', 401);
      }
      res.status(200).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const data = { ...req.body };
  if (!data) {
    throw new CastError('Переданы некорректные данные.', 400);
  }

  User.findByIdAndUpdate(
    req.user._id,
    data,
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new CastError('Пользователь по указанному _id не найден.', 404);
      }
      res.status(201).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const massage = `${Object.values(err.errors).map((el) => el.message).join(', ')}`;
        const errorCustom = new CastError(massage, 400);
        next(errorCustom);
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        const errorCustom = new CastError('Данный Email уже используется', 409);
        next(errorCustom);
      }
      if (err.code === 500) {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  login,
  signOut,
  successfulAuth,
  getUser,
  updateUser,
}