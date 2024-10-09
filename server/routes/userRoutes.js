// server/routes/userRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Sign-Up Route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// Sign-In Route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // You might want to create a session here, or return a token
    res.status(200).json({ message: "Sign-in successful" });
  } catch (error) {
    res.status(500).json({ message: "Error signing in" });
  }
});

// Sign-Out Route
router.post('/signout', async (req, res) => {
  // If using session-based authentication
  req.session = null;  // Clear session data
  // If using token-based authentication
  // No action needed here, just ensure the client deletes the token

  res.status(200).json({ message: "Sign-out successful" });
});

module.exports = router;
