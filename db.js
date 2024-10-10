const mongoose = require('mongoose');

const connectToMongoose = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017");  // Deprecated options removed
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectToMongoose;
