// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config();
var fetchUser = require('../middlewares/fetchUser')




// Route-1 Create User - POST "/api/user/createuser" - No Login Required 
router.post('/createuser', [
  body('name', 'Name must be at least 3 characters').isLength({ min: 3 }),
  body('password', 'Password must be at least 6 characters').isLength({ min: 5 }),
  body('email', 'Enter a valid email').isEmail(),
  body('type').isIn(['Student', 'Recruiter', 'Company']).withMessage('Type must be either Student, Recruiter, or Company'),
], async (req, res) => {

  // Handle Bad Request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check wheather user with same email exist or not 
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
      email: req.body.email,
      type: req.body.type
    })

    const data = {
      user: {
        id: user.id,
        type: user.type
      }
    }

    const token = jwt.sign(data, process.env.JWT_SECRET);
    res.json({ token })
  }
  // If Anything is WRONG Internally 
  catch (err) {
    console.log(err)
    res.status(500).send("Internal Server Error")
  }
})



// Route-2 Login User - POST "/api/user/login" - Login Required 
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

    let user = await User.findOne({ email })
    if (!user) {
      return res.status(403).json({ error: "Invalid Username or Password" });
    }

    const passowrdCompare = await bcrypt.compare(password, user.password)
    if (!passowrdCompare) {
      Success = false
      return res.status(403).json({ Success, error: "Invalid Username or Password" });
    }

    const data = {
      user: {
        id: user.id,
        type: user.type
      }
    }
    const token = jwt.sign(data, process.env.JWT_SECRET);
    Success = true
    res.json({ Success: true, token, type: user.type });

  }
  catch (error) {
    console.log(error)
    res.status(500).send("Internal Server Error")

  }
})

// Route-3 Get All User - POST "/api/user/getuser" - Login Required 
router.post('/getuser', fetchUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {

    let userID = req.user.id
    const user = await User.findById(userID).select("-password")
    res.send(user)

  }
  catch (err) {
    console.log(err)
    res.status(500).send("Internal Server Error")

  }
})

// Route-4 Get get premium status of the use - GET "/api/user/premium-status" - Login Required 
router.get('/premium-status', fetchUser, async (req, res) => {
  try {

    const user = await User.findById(req.user.id); // Assuming fetchUser middleware sets req.user
    res.json({ isPremiumUser: user.isPremiumUser });

  } catch (err) {

    console.error(err.message);
    res.status(500).send('Server error');
  }
});



// Route-5 Fetch User Details - GET "/api/user/fetchuser" - Login Required
router.get('/fetchuser', fetchUser, async (req, res) => {
  try {
    // Get the user details by ID
    const user = await User.findById(req.user.id).select("-password"); // Exclude password from the response
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route-6 Edit User Details - PUT "/api/user/edituser" - Login Required
router.put('/edituser', [
  body('name', 'Name must be at least 3 characters').optional().isLength({ min: 3 }),
  body('email', 'Enter a valid email').optional().isEmail(),
  body('type').optional().isIn(['Student', 'Recruiter', 'Company']).withMessage('Type must be either Student, Recruiter, or Company'),
], fetchUser, async (req, res) => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, type } = req.body;
    const userID = req.user.id;

    // Build the update object
    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (email) updatedFields.email = email;
    if (type) updatedFields.type = type;

    // Find the user and update their details
    const user = await User.findByIdAndUpdate(userID, { $set: updatedFields }, { new: true }).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ success: true, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});



module.exports = router