const router = require('express').Router();

const { createMovieValidation, findMovieByIdValidation } = require('../middlewares/celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movieControllers');

router.get('/movies', getMovies);
router.post('/movies', createMovieValidation, createMovie);
router.delete('/movies/:movieId', findMovieByIdValidation, deleteMovie);

module.exports = router;
