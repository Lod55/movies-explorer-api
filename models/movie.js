const { Schema, model } = require('mongoose');
const { messages, urlRegEx } = require('../configs/index');

const movieSchema = new Schema({
  country: {
    type: String,
    required: [true, messages.models.required],
  },
  director: {
    type: String,
    required: [true, messages.models.required],
  },
  duration: {
    type: Number,
    required: [true, messages.models.required],
  },
  year: {
    type: String,
    required: [true, messages.models.required],
  },
  description: {
    type: String,
    required: [true, messages.models.required],
  },
  image: {
    type: String,
    required: [true, messages.models.required],
    validate: {
      validator: (v) => urlRegEx.test(v),
      message: messages.models.format('URL'),
    },
  },
  trailer: {
    type: String,
    required: [true, messages.models.required],
    validate: {
      validator: (v) => urlRegEx.test(v),
      message: messages.models.format('URL'),
    },
  },
  thumbnail: {
    type: String,
    required: [true, messages.models.required],
    validate: {
      validator: (v) => urlRegEx.test(v),
      message: messages.models.format('URL'),
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, messages.models.required],
  },
  movieId: {
    type: Number,
    required: [true, messages.models.required],
  },
  nameRU: {
    type: String,
    required: [true, messages.models.required],
  },
  nameEN: {
    type: String,
    required: [true, messages.models.required],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('movie', movieSchema);
