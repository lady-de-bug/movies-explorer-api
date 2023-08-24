const Movie = require('../models/movie');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');

function getMovies(req, res, next) {
  const owner = req.user._id;
  return Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
}

function createMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
}

function deleteMovie(req, res, next) {
  const { movieId } = req.params;
  return Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Запрашиваемый фильм не найден');
      }
      if (String(movie.owner) !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалять фильмы других пользователей');
      }
      return movie.deleteOne();
    })
    .then((currentMovie) => res.send({ data: currentMovie }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
