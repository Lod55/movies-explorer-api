const router = require('express').Router();
const auth = require('../middlewares/auth');
const CastError = require('../errors/cast-err');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const {
  createUserValidator,
  loginValidator,
} = require('../middlewares/validators/usersValidators');
const {
  createUser,
  login,
  signOut,
  successfulAuth,
} = require('../controllers/users.js');

router.post('/signup', createUserValidator, createUser);
router.post('/signin', loginValidator, login);
router.delete('/signout', auth, signOut);
router.get('/check-auth', auth, successfulAuth);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.use('*', (res, req, next) => {
  const castError = new CastError('Данный запрос не найден', 404);
  next(castError);
});

module.exports = router;