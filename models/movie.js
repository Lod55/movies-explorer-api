const { Schema, model } = require('mongoose');
const { isUrl } = require('validator');

const movieSchema = new Schema({
  country: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isUrl(v),
      message: 'Неправильный формат Url',
    }
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isUrl(v),
      message: 'Неправильный формат Url',
    }
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isUrl(v),
      message: 'Неправильный формат Url',
    }
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true
  },
  nameRU: {
    type: String,
    required: true
  },
  nameEN: {
    type: String,
    required: true
  }
})

module.exports = model('movie', movieSchema);