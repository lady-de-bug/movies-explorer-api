const router = require('express').Router();
const userRouter = require('./userRoutes');
const movieRouter = require('./movieRoutes');
const { createUserValidation, loginValidation } = require('../middlewares/celebrate');
const { createUser, login } = require('../controllers/userControllers');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/NotFoundError');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', createUserValidation, createUser);
router.post('/signin', loginValidation, login);

router.use(auth);
router.use('/', userRouter);
router.use('/', movieRouter);
router.use((req, res, next) => {
  next(new NotFoundError(`Ресурс по адресу ${req.path} не найден`));
});
module.exports = router;
