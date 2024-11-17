const express = require('express');
const { body } = require("express-validator");
const fetchUser = require('../middlewares/fetchUser');
const router = express.Router();
const { createGroup, getGroups, joinGroup, getUserGroups } = require('../controllers/groupController');

// Route to add a new group (POST /api/groups/creategroup) - Login required
router.post('/creategroup', fetchUser, [
    body('name', 'Group must have a name').isLength({ min: 5 }),
    body('description', 'Description must be at least 10 characters').isLength({ min: 10 }),
], createGroup);

// Route to get all groups (GET /api/groups) - Optional, can be used if needed
router.get('/', fetchUser, getGroups);

// Route to get groups for a specific user (GET /api/groups/user) - Login required
router.get('/user', fetchUser, getUserGroups);

// Route to join a group (PATCH /api/groups/join/:groupId) - Login required
router.patch('/join/:groupId', fetchUser, joinGroup);

module.exports = router;
