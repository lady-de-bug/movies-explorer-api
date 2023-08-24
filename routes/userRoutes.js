const router = require('express').Router();

const { updateUserValidation } = require('../middlewares/celebrate');

const {
  updateUser,
  getCurrentUser,
} = require('../controllers/userControllers');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', updateUserValidation, updateUser);

module.exports = router;
