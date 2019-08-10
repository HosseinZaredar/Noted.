const express = require('express');
const router = express.Router();
const User = require('./User');
const jwt = require('jsonwebtoken');

router.get('/', function(req, res, next) {
  res.send('working!');
});

router.post('/signup', function(req, res, next) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (user) {
      res.status(200).json({
        status: 'email already exists'
      });
    } else {
      User.create(
        {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        },
        function() {
        res.status(200).json({
          status: 'ok'
        });
      });
    }
  });
});

router.post('/login', function(req, res, next) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (user) {
      if (user.password === req.body.password) {
        //sending token
        var payload = {id: user._id}
        var token = jwt.sign(payload, 'some untold secret');
        res.status(200).json({
          status: 'ok',
          token: token
        });
      } else {
        res.status(200).json({
          status: 'wrong password'
        });
      }
    } else {
      res.status(200).json({
        status: 'user not found'
      });
    }
  });
});

router.get('/protected', function(req, res, next) {
  var token = req.headers['authorization'];
  jwt.verify(token, 'some untold secret', (err, decoded) => {
    console.log(decoded);
  });
});


module.exports = router;