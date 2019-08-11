const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const Note = require('../Models/Note');

router.post('/', (req, res, next) => {
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

router.get('/', (req, res, next) => {
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

router.delete('/:id', (req, res, next) => {
  var _id = req.params.id;
  var token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, 'some untold secret', (err, decoded) => {
      User.findById(decoded.id, (err, user) => {
          user.notes = user.notes.filter(function(note, index, array) {
            return note._id != _id;
          });
          user.trashNotes.push(_id);
          user.save((err, newUser) => {
            res.status(200).json({
              status: 'ok'
            });
          });
      });
    }); 
  }
});

router.put('/:id', (req, res, next) => {
  var _id = req.params.id;
  var note = req.body.note;
  var token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, 'some untold secret', (err, decoded) => {
      Note.findById(_id, (err, foundNote) => {
        foundNote.title = note.title;
        foundNote.content = note.content;
        foundNote.save(() => {
          res.status(200).json({
            status: 'ok'
          });
        });
      });
    }); 
  }
});

module.exports = router;
