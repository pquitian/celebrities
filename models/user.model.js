const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'Email is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    unique: true
  },
  password: {
    type: String,
    required: 'Password is required',
  }
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();

  bcrypt.genSalt(saltRounds)
    .then((saltValue) => {
      return bcrypt.hash(this.password, saltValue)
    })
    .then((hash) => {
      this.password = hash;
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
