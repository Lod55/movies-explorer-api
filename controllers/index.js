const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('./movies');
const {
  createUser,
  login,
  signOut,
  successfulAuth,
  getUser,
  updateUser,
} = require('./users');

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
  createUser,
  login,
  signOut,
  successfulAuth,
  getUser,
  updateUser,
};
