const router = require('express').Router();
const auth = require('../middlewares/auth');
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

module.exports = router;