const {
  Schema,
  model,
} = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
const { messages } = require('../configs/index');
const { UnauthorizedError } = require('../errors/index');

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, messages.models.unique],
    required: [true, messages.models.required],
    validate: {
      validator: (v) => isEmail(v),
      message: messages.models.format('Email'),
    },
  },
  password: {
    type: String,
    required: [true, messages.models.required],
    select: false,
  },
  name: {
    type: String,
    required: [true, messages.models.required],
    minLength: [2, messages.models.minLength(2)],
    maxLength: [30, messages.models.maxLength(30)],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.statics.findUserByCredentials = function authorization(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(messages.authorization.badDate);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(messages.authorization.badDate);
          }

          return user;
        });
    });
};

module.exports = model('user', userSchema);
