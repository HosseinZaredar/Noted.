const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const Note = require('../Models/Note');

router.get('/', async (req, res) => {
  var token = req.headers['authorization'];
  if (token) {
    var decoded = await jwt.verify(token, 'some untold secret');
    var user = await User.findById(decoded.id).populate('notes').exec();
    res.status(200).json({notes: user.notes});
  }
});

router.post('/', async (req, res) => {
  var token = req.headers['authorization'];
  if (token) {
    var decoded = await jwt.verify(token, 'some untold secret');
    var note = await Note.create({title: req.body.title, content: req.body.content});
    var user = await User.findById(decoded.id);
    user.notes.push(note._id);
    await user.save()
    res.status(200).json({id: note._id});
  }
});

router.delete('/:id', async (req, res) => {
  var _id = req.params.id;
  var token = req.headers['authorization'];
  if (token) {
    var decoded = await jwt.verify(token, 'some untold secret');
    var user = await User.findById(decoded.id);
    user.notes = user.notes.filter(note => note._id != _id);
    user.trashNotes.push(_id);
    await user.save()
    res.status(200).json({status: 'ok'});
  }
});

router.put('/:id', async (req, res) => {
  var _id = req.params.id;
  var note = req.body.note;
  var token = req.headers['authorization'];
  if (token) {
    var decoded = await jwt.verify(token, 'some untold secret');
    foundNote = await Note.findById(_id);
    foundNote.title = note.title;
    foundNote.content = note.content;
    await foundNote.save();
    res.status(200).json({status: 'ok'});
  }
});

module.exports = router;
