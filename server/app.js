const express = require('express');
const connectToMongo = require('./db');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
connectToMongo();

// Use user routes
app.use('/api/auth', require('./routes/userRoutes'));

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
