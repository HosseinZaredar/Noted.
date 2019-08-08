const express = require('express');
const router = express.Router();
const User = require('./User');

router.get('/', function(req, res, next) {
  res.send('working!');
});

router.post('/signup', function(req, res, next) {
  User.create({...req.body}, function(err, record) {
    res.status(200).json({
      status: 'Done!'
    });
  });
});


module.exports = router;