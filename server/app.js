const express = require('express');
const connectToMongo = require('./db');
var cors = require('cors');
const app = express();
require('dotenv').config();
// Middleware to parse JSON bodies
app.use(express.json());
// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000', // Allow only the React development server
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Connect to MongoDB
connectToMongo();

// Use user routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port http://localhost:${process.env.PORT}`);
});
