// server/config.js
module.exports = {
    mongoURI: process.env.MONGO_URI,  // MongoDB connection string
    jwtSecret: process.env.JWT_SECRET,  // JWT secret for tokens
  };
  