const { getMovies, createMovie, deleteMovieById } = require('./movies');
const {
  createUser,
  login,
  signOut,
  checkAuth,
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
  checkAuth,
  getUser,
  updateUser,
};
