// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const JWT_Token = '123@b76gf@'

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

    // salt to password 
    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password, salt)
    // Create New User 
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email
    })
    const data = {
      user: {
        id: user.id
      }
    }
    const token = jwt.sign(data, JWT_Token);
    res.json({ token })
  }
  // If Anything is WRONG Internally 
  catch (err) {
    console.log(err)
    res.status(500).send("Internal Server Error")
  }
})

// Authticate User using
router.post('/login', [
  body('password', 'Password Canot be Blank ').exists(),
  body('email', 'Enter a valid email').isEmail(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body

  try {
    let user = await User.findOne({email})
    if (!user) {
      return res.status(403).json({ error: "Invalid Username or Password" });
    }

    const passowrdCompare = await bcrypt.compare(password, user.password)
    if (!passowrdCompare) {
      return res.status(403).json({ error: "Invalid Username or Password" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const token = jwt.sign(data, JWT_Token);
    res.json({ token })

  }
  catch (error) {
    console.log(error)
    res.status(500).send("Internal Server Error")

  }
}
)

module.exports = router