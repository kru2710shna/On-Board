// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require("express-validator");

// Create User - POST "/api/auth/"
router.post('/', [
  body('name', 'Name must be at least 5 characters').isLength({ min: 5 }),
  body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  body('email', 'Enter a valid email').isEmail(),
], async (req, res) => {
  // Validate the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await User.create({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  }).then(user => res.json(user))
    .catch(err => {
      console.log(err)
      res.json({ error: 'Pleae Enter Valid Email' , message: err.message })
    });
})
module.exports = router