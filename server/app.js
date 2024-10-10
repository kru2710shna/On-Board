const express = require('express');
const connnectToMongoose = require('../db');

connnectToMongoose();  // Ensuring mongoose connects properly

const app = express();
const port = 3000;
app.use(express.json());


// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/auth/User',require('./routes/userRoutes'))


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});