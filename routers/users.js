const router = require('express')
  .Router();
const {
  getUser,
  updateUser,
} = require('../controllers/index');
const { updateUserValidator } = require('../middlewares/index');

router.get('/me', getUser);
router.patch('/me', updateUserValidator, updateUser);

module.exports = router;
