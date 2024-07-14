const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // ensures email is unique
  },
  password: {
    type: String,
    required: tru
  },
  location: {
    type: String,
    required: false
  }
});

const User = mongoose.Model('User', userSchema);

module.exports = User