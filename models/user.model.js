const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let salt = null

bcrypt.genSalt(saltRounds)
  .then((saltValue) => {
    salt = saltValue
  })

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'Email is required',
    unique: true
  },
  password: {
    type: String,
    required: 'Password is required',
  }
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();

  bcrypt.hash(this.password, salt)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((error) => {
      next();
    })
})

userSchema.methods.checkPassword = function(passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
}

module.exports = mongoose.model('User', userSchema);
