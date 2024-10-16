// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require("express-validator");

// Create User - POST "/api/auth/createuser" - No Login Required 
router.post('/createuser', [
  body('name', 'Name must be at least 5 characters').isLength({ min: 5 }),
  body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  body('email', 'Enter a valid email').isEmail(),
], async (req, res) => {
  // Handle Bad Request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // Check wheather user with sam email exist or not 
    let user = await User.findOne({ email: req.body.email })

    if (user) {
      return res.status(400).json({ error: "User Already Exists" })
    }
    // Create New User 
    user = await User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    })
    res.json(user)
  }
  // If Anything is WRONG Internally 
  catch (err) {
    console.log(err)
    res.status(500).send("Internal Error Occured")
  }
})
module.exports = router