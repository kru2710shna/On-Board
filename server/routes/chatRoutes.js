const express = require("express");
const router = express.Router();
const { getChatResponse } = require("../controllers/chatController");

// POST route to handle chat messages
router.post("/message", getChatResponse);

module.exports = router;
