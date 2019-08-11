const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

router.get('/', async (req, res) => {
  var token = req.headers['authorization'];
  if (token) {
    var decoded = await jwt.verify(token, 'some untold secret');
    var user = await User.findById(decoded.id);
    res.status(200).json({username: user.username});  
  } else {
    res.status(200).json({username: ''});
  }
});

module.exports = router;