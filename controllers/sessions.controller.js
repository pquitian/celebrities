const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/user.model');

module.exports.create = (req, res, next) => {
  res.render('sessions/create', {
    user: new User()
  });
}

module.exports.doCreate = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  function doesNotExist(res) {
    res.render("sessions/create", {
      user: new User(req.body),
      errors: {
        "email": "Does not exist"
      }
    })
  }

  if (!email || !password) {
    res.render("sessions/create", {
      user: new User(req.body),
      errors: {
        "email": "Can't be blank",
        "password": "Can't be blank"
      }
    })
  } else {
    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          user.checkPassword(password)
            .then((match) => {
              if (match) {
                res.send("OH YEAH!")
              } else {
                doesNotExist(res);
              }
            })
            .catch(error => next(error));
        } else {
          doesNotExist(res);
        }
      })
      .catch(error => next(error))
  }
}
