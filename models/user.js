const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
const CastError = require('../errors/cast-err');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат Email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minLength: [2, 'Минимальное кол-во символов 2'],
    maxLength: [30, 'Максимальное кол-во символов 30'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

userSchema.statics.findUserByCredentials = function(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new CastError('Неправильные почта или пароль', 401);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new CastError('Неправильные почта или пароль', 401);
          }

          return user;
        });
    });
};

module.exports = model('user', userSchema);