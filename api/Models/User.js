const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  notes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Notes'}],
  trashNotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Notes'}]
});

module.exports = mongoose.model('Users', userSchema);

