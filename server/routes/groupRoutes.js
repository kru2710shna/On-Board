import express from 'express';
import { body } from 'express-validator'; // Use ES import syntax
import fetchUser from '../middlewares/fetchUser.js'; // Use ES import syntax
import { createGroup, getGroups, joinGroup, getUserGroups, deleteGroup, sendMessageToGroup, getGroupDetails } from '../controllers/groupController.js';

const router = express.Router();

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

// Route to delete a group (DELETE /api/groups/:groupId) - Login required
router.delete('/delete/:groupId', fetchUser, deleteGroup);

// New Route for Sending Messages
router.post('/:groupId/message', fetchUser, sendMessageToGroup);

// Route to get group details (GET /api/groups/:groupId) - Login required
router.get('/:groupId', fetchUser,getGroupDetails)

export default router;  // Use export default
