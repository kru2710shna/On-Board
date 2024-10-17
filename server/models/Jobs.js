// models/Jobs.js
const mongoose = require('mongoose');

// Define a schema for the User model
const jobsSchema = new mongoose.Schema({
  user : {
    type: mongoose.Schema.Types.ObjectId, 
    ref : "user",
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  jobDescription: {  
    type: String,
    required: true,
  },
  jobSalary: {
    type: String, 
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  jobType: {
    type: String,
  },
  jobCompany: {
    type: String, 
  }
});

// Create the User model
const Job = mongoose.model('Job', jobsSchema);
module.exports = Job; 
