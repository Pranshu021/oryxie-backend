const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
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
    required: true
  },
  refresh_tokens: {
    type: [String],
    required: false
  },
  location: {
    type: String,
    required: false
  },
  movies_watched: {
    type: Array,
    required: false
  },
  shows_watched: {
    type: Array,
    required: false
  },
  last_login: {
    type: Date,
    required: false
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  modifiedAt: {
    type: Date,
    required: false
  }
});

const User = mongoose.model('users', userSchema);

module.exports = User