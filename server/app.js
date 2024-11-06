const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');
const app = express();
require('dotenv').config();
// Middleware to parse JSON bodies
app.use(express.json());

// Configure CORS
app.use(cors({
    origin: 'http://localhost:3001', // Allow only your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Include credentials if needed
}));


// Connect to MongoDB
connectToMongo();

// Use user routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/subscribe', require('./routes/subscribeRoutes'));


app.listen(process.env.PORT, () => {
  console.log(`Listening on port http://localhost:${process.env.PORT}`);
});
