const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { messages, secretKey } = require('../configs/index');
const {
  BadRequestError,
  NotFoundError,
  ConflictError,
  UnauthorizedError,
} = require('../errors/index');

const createUser = (req, res, next) => {
  const data = { ...req.body };

  if (!data.email || !data.password || !data.name) {
    throw new BadRequestError(messages.badRequest);
  }

  bcrypt
    .hash(data.password, 10)
    .then((hash) =>
      User.create({
        ...data,
        password: hash,
      })
    )
    .then((user) =>
      res.status(201).send({
        massage: 'Регистрация прошла успешно!',
        _id: user._id,
        name: user.name,
        email: user.email,
      })
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const massage = `${Object.values(err.errors)
          .map((el) => el.message)
          .join(', ')}`;
        const errorCustom = new BadRequestError(massage);
        next(errorCustom);
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        const errorCustom = new ConflictError(messages.user.conflict);
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
    throw new BadRequestError(messages.badRequest);
  }

  return User.findUserByCredentials(data.email, data.password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, secretKey, {
        expiresIn: '24h',
      });

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: messages.authorization.successfully });
    })
    .catch(next);
};

const signOut = (req, res) => {
  res.clearCookie('jwt').send({ message: messages.logout });
};

const checkAuth = (req, res) => {
  res.send({ message: messages.authorization.status.success });
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(messages.authorization.unsuccessful);
      }
      res.send({
        name: user.name,
        email: user.email,
      });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const data = { ...req.body };
  if (!data) {
    throw new BadRequestError(messages.badRequest);
  }

  User.findByIdAndUpdate(req.user._id, data, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(messages.user.notFound);
      }
      res.status(201).send({
        massage: 'Данные успешно обновлены!',
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const massage = `${Object.values(err.errors)
          .map((el) => el.message)
          .join(', ')}`;
        const errorCustom = new BadRequestError(massage);
        next(errorCustom);
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        const errorCustom = new ConflictError(messages.user.conflict);
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
  checkAuth,
  getUser,
  updateUser,
};
