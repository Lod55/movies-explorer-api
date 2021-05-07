const router = require('express').Router();
const {
  createMovieValidator,
  deleteMovieValidator,
} = require('../middlewares/validators/moviesValidators');
const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', createMovieValidator, createMovie);
router.delete('/:movieId', deleteMovieValidator, deleteMovieById);

module.exports = router;
