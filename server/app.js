import express from 'express';
import connectToMongo from './db.js'
import cors from 'cors'; 

import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests only from the frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'auth_token'], // Allow required headers
  credentials: true, // Allow cookies or credentials
}));
// app.use(cors());


// Connect to MongoDB
connectToMongo();

// Use user routes
import userRoutes from './routes/userRoutes.js';  
import jobRoutes from './routes/jobRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import subscribeRoutes from './routes/subscribeRoutes.js';
import groupRoutes from './routes/groupRoutes.js';


// Route setups
app.use('/api/user', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/subscribe', subscribeRoutes);
app.use('/api/groups', groupRoutes);


// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port http://localhost:${process.env.PORT}`);
});