const express = require('express');
const router = express.Router();
const User = require('../Models/User');

router.post('/', async (req, res) => {
  var user = await User.findOne({email: req.body.email});
  if (user) {
    res.status(200).json({status: 'email already exists'});
  } else {
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    res.status(200).json({status: 'ok'});
  }
});

module.exports = router;
