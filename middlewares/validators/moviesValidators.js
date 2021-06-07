const { celebrate, Joi } = require('celebrate');
const { urlRegEx } = require('../../configs/index');

const createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegEx, 'URL'),
    trailer: Joi.string().required().pattern(urlRegEx, 'URL'),
    thumbnail: Joi.string().required().pattern(urlRegEx, 'URL'),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

const deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.number().required(),
  }),
});

module.exports = {
  createMovieValidator,
  deleteMovieValidator,
};
