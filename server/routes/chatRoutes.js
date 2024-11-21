import express from 'express';
const router = express.Router();
import getChatResponse from "../controllers/chatController.js";

// POST route to handle chat messages
router.post("/message", getChatResponse);

export default router; // Use export default for ES modules
