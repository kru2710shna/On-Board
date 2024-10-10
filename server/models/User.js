// models/user.js
const mongoose = require('mongoose');
const {Schema} = mongoose;

// Define a schema for the User model
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date:{
    type: Date,
    default: Date.now
  }
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
