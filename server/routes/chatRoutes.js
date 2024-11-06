// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const { getChatResponse } = require('../controllers/chatController');
const fetchUser = require('../middlewares/fetchUser');


// Route to handle chat messages
// router.post('/message', getChatResponse);
router.post('/message', fetchUser, getChatResponse);


module.exports = router;
