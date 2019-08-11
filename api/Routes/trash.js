const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const Note = require('../Models/Note');

router.get('/', (req, res, next) => {
  var token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, 'some untold secret', (err, decoded) => {
      User.findById(decoded.id)
      .populate('trashNotes')
      .exec((err, user) => {
        res.status(200).json({
          notes: user.trashNotes
        });
      });
    }); 
  }
});

router.delete('/:id', (req, res, next) => {
  var _id = req.params.id;
  var token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, 'some untold secret', (err, decoded) => {
      User.findById(decoded.id, (err, user) => {
          user.trashNotes = user.notes.filter(function(note, index, array) {
            return note._id != _id;
          });
          user.save(() => {
            Note.findByIdAndDelete(_id, function() {
              res.status(200).json({
                status: 'ok'
              });
            });
          });
      });
    }); 
  }
});

module.exports = router;
