const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String
});

module.exports = mongoose.model('Users', userSchema);

