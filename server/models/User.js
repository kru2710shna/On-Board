// models/user.js
const mongoose = require('mongoose');

// Define a schema for the User model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isPremiumUser: {
    type: Boolean,
    default: false
  },
  trialStartTime: {
    type: Date,
    default: null
  },
});

// Create the User model
const User = mongoose.model('User', userSchema);
User.createIndexes();
module.exports = User; 
