const router = require('express')
  .Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { NotFoundError } = require('../errors/index');
const { messages } = require('../configs/index');
const {
  auth,
  createUserValidator,
  loginValidator,
} = require('../middlewares/index');

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

router.use('*', auth, (res, req, next) => {
  const castError = new NotFoundError(messages.server.notFound);
  next(castError);
});

module.exports = router;
