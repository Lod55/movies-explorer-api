const Movie = require('../models/movie');
const User = require('../models/user');
const CastError = require('../errors/cast-err');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id }, { __v: 0, createdAt: 0 })
    .populate('owner', { __v: 0, createdAt: 0 })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const data = { ...req.body };

  if (!data) {
    throw new CastError('Переданы некорректные данные.', 400);
  }

  let owner;

  User.findById(req.user._id, { __v: 0, createdAt: 0 })
    .then((user) => {
      if (!user) {
        throw new CastError('Пользователь по указанному _id не найден.', 404);
      }
      owner = user;

      return Movie.findOne({ owner: req.user._id, movieId: data.movieId })
        .then((movie) => {
          if (movie) {
            throw new CastError('Данный фильм уже добавлен!', 409);
          }

          return Movie.create({ ...data, owner })
            .then((newMovie) => {
              res.status(201).send(newMovie);
            })
            .catch(next);
        });
    })
    .catch(next);
};

const deleteMovieById = (req, res, next) => {
  const { movieId } = req.params;

  if (!movieId) {
    throw new CastError('Переданы некорректные данные.', 400);
  }

  Movie.findOne({ owner: req.user._id, movieId })
    .then((movie) => {
      if (!movie) {
        throw new CastError('Фильм с указанным id не найден.', 404);
      }

      if (movie.owner.toString() !== req.user._id.toString()) {
        throw new CastError('Фильм другого пользователя удалить нельзя!', 403);
      }

      Movie.deleteOne(movie)
        .then(res.send({ message: 'Фильм удалён' }))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
