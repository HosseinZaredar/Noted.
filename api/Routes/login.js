const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

router.post('/', async (req, res) => {
  var user = await User.findOne({email: req.body.email});
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

module.exports = router;
