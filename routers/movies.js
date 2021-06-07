const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/index');
const {
  createMovieValidator,
  deleteMovieValidator,
} = require('../middlewares/index');

router.get('/', getMovies);
router.post('/', createMovieValidator, createMovie);
router.delete('/:movieId', deleteMovieValidator, deleteMovieById);

module.exports = router;
