const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
  console.log(`Doing presave......`);

  if (!this.isModified('password')) return next();

  console.log(`current password: ${this.password}`);

  bcrypt.genSalt(saltRounds)
    .then((saltValue) => {
      return bcrypt.hash(this.password, salt)
    })
    .then((hash) => {
      console.log(`hash returned by promise: ${hash}`);
      this.password = hash;

      console.log(`password after hash: ${this.password}`);
      next();
    })
    .catch((error) => {
      this.password = null;
      next();
    })
})

userSchema.methods.checkPassword = function(passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
}

module.exports = mongoose.model('User', userSchema);
