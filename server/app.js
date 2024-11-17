const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');
const app = express();
require('dotenv').config();


// Middleware to parse JSON bodies
app.use(express.json());

// Configure CORS
app.use(cors({
  origin: '*' , // Allow your frontend origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true // Allow cookies and headers to be sent
}));

// Other middleware and route setups
app.use(express.json());



// Connect to MongoDB
connectToMongo();

// Use user routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use('/api/subscribe', require('./routes/subscribeRoutes'));
app.use('/api/groups', require('./routes/groupRoutes'));


app.listen(process.env.PORT, () => {
  console.log(`Listening on port http://localhost:${process.env.PORT}`);
});
