const express = require('express');
const router = express.Router();
const User = require('../Models/User');

router.post('/', function(req, res, next) {
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

module.exports = router;
