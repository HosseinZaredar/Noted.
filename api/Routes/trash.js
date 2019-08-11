const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const Note = require('../Models/Note');

router.get('/', async (req, res) => {
  var token = req.headers['authorization'];
  if (token) {
    var decoded = await jwt.verify(token, 'some untold secret')
    var user = await User.findById(decoded.id).populate('trashNotes').exec();
    res.status(200).json({notes: user.trashNotes});
  }
});

router.delete('/:id', async (req, res) => {
  var _id = req.params.id;
  var token = req.headers['authorization'];
  if (token) {
    var decoded = await jwt.verify(token, 'some untold secret');
    var user = await User.findById(decoded.id)
    user.trashNotes = user.trashNotes.filter(note => note._id != _id);
    await user.save()
    await Note.findByIdAndDelete(_id);
    res.status(200).json({status: 'ok'});
  }
});

router.put('/:id', async (req, res) => {
  var _id = req.params.id;
  var token = req.headers['authorization'];
  if (token) {
    var decoded = await jwt.verify(token, 'some untold secret');
    var user = await User.findById(decoded.id);
    user.trashNotes = user.trashNotes.filter(note =>note._id != _id);
    user.notes.push(_id);
    await user.save();
    res.status(200).json({status: 'ok'});    
  }
});

module.exports = router;
