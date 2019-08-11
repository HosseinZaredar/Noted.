const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

router.get('/', function(req, res, next) {
  var token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, 'some untold secret', (err, decoded) => {
      User.findById(decoded.id, function(err, user) {
        res.status(200).json({
          username: user.username
        });
      });
    });
  } else {
    res.status(200).json({
      username: ''
    });
  }
});

module.exports = router;