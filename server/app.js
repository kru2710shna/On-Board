const express = require('express');
const connectToMongo = require('./db');

const app = express();
require('dotenv').config();
// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
connectToMongo();

// Use user routes
app.use('/api/auth', require('./routes/userRoutes'));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port http://localhost:${process.env.PORT}`);
});
