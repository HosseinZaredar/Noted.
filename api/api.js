const express = require('express');
const router = express.Router();
const User = require('./User');
const Note = require('./Note');
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

router.get('/username', function(req, res, next) {
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

router.post('/note', (req, res, next) => {
  var token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, 'some untold secret', (err, decoded) => {
      Note.create({title: req.body.title, content: req.body.content}, function(err, note) {
        User.findById(decoded.id, (err, user) => {
          user.notes = [...user.notes, note._id]
          user.save(() => {
            res.status(200).json({
              id: note._id
            });
          });
        });
      });
    }); 
  }
});

router.get('/notes', (req, res, next) => {
  var token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, 'some untold secret', (err, decoded) => {
      User.findById(decoded.id)
      .populate('notes')
      .exec((err, user) => {
        res.status(200).json({
          notes: user.notes
        });
      });
    }); 
  }
});

router.delete('/note/:id', (req, res, next) => {
  var _id = req.params.id;
  var token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, 'some untold secret', (err, decoded) => {
      User.findById(decoded.id, (err, user) => {
          user.notes = user.notes.filter(function(note, index, array) {
            return note._id != _id;
          });
          user.save((err, newUser) => {
            res.status(200).json({
              status: 'ok'
            });
          });
      });
    }); 
  }
});


module.exports = router;