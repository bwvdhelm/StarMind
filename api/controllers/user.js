const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
  const email = req.body.email;
  User.findOne({ email: email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then(result => {
          if (result) {
            const token = jwt.sign(
              {
                email: user.email,
                userId: user._id
              },
              process.env.JWT_KEY,
              {
                expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          } else {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
        })
        .catch(err => {
          res.status(401).json({
            message: "Auth failed"
          });
        });
    })
    .catch(err => {
      res.status(404).json({
        message: "Auth failed"
      });
      console.log(err);
    });
};

exports.signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length > 0) {
        return res.status(422).json({
          message: "Email already in use!"
        });
      } else {
        bcrypt
          .hash(req.body.password, 10)
          .then(hash => {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "Account created!",
                  id: user._id
                });
              })
              .catch(err => {
                res.status(500).json({
                  error: err
                });
                console.log(err);
              });
          })
          .catch(err => {
            console.log("error detected!");
            return res.status(500).json({
              error: err
            });
          });
      }
    });
};

exports.get_all_users = (req, res, next) => {
  User.find({})
    .exec()
    .then(users => {
      result = users.map(user => {
        return {
          id: user._id,
          email: user.email
        };
      });
      res.status(200).json({
        message: "Users successfully retrieved!",
        users: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
      console.log(err);
    });
};

exports.get_users = (req, res, next) => {
  User.findOne({email: req.params.email})
    .exec()
    .then(user => {
      console.log(user);
      res.status(200).json({
        message: "User successfully retrieved!",
        user: user
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
      console.log(err);
    });
};

exports.delete_user = (req, res, next) => {
    User.remove({ _id: req.params.userId })
      .exec()
      .then(result => {
        console.log(result);
        res.status(200).json({
          message: "User deleted!"
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
        console.log(err);
      });
  }