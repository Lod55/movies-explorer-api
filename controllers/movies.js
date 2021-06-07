const Movie = require('../models/movie');
const User = require('../models/user');
const {
  BadRequestError,
  NotFoundError,
  ConflictError,
  ForbiddenError,
} = require('../errors/index');
const { messages } = require('../configs/index');

const getMovies = (req, res, next) => {
  Movie.find(
    { owner: req.user._id },
    {
      __v: 0,
      createdAt: 0,
    }
  )
    .populate('owner', {
      __v: 0,
      createdAt: 0,
    })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const data = { ...req.body };

  if (!data) {
    throw new BadRequestError(messages.badRequest);
  }

  let owner;

  User.findById(req.user._id, {
    __v: 0,
    createdAt: 0,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(messages.user.notFound);
      }
      owner = user;

      return Movie.findOne({
        owner: req.user._id,
        movieId: data.movieId,
      }).then((movie) => {
        if (movie) {
          throw new ConflictError(messages.movie.conflict);
        }

        return Movie.create({
          ...data,
          owner,
        })
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
    throw new BadRequestError(messages.badRequest);
  }

  Movie.findOne({
    owner: req.user._id,
    movieId,
  })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(messages.movie.notFound);
      }

      if (movie.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError(messages.movie.forbidden);
      }

      Movie.deleteOne(movie)
        .then(res.send({ message: messages.movie.delete }))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
