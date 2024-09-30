// server/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');  // Import routes
require('dotenv').config();  // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());  // Allow cross-origin requests (for front-end communication)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Routes
app.use('/api/users', userRoutes);  // Add user routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
