const mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
  title: String,
  content: String
});

module.exports = mongoose.model('Notes', noteSchema);

