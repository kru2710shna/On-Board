// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const { getChatResponse } = require('../controllers/chatController');

// Route to handle chat messages
router.post('/message', getChatResponse);

module.exports = router;
