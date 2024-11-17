const Groups = require('../models/Groups');
const { validationResult } = require('express-validator');

// Controller to get all groups (optional, if needed)
exports.getGroups = async (req, res) => {
    try {
        const groups = await Groups.find();
        return res.json(groups); // Ensure only one response is sent
    } catch (error) {
        console.error('Error fetching groups:', error);
        res.status(500).json({ error: 'Error fetching groups' });
    }
};

// Controller to get groups for a specific user
exports.getUserGroups = async (req, res) => {
    try {
        const userId = req.user.id;
        const groups = await Groups.find({
            $or: [
                { createdBy: userId },
                { members: userId }
            ]
        });
        res.json(groups);
    } catch (error) {
        console.error('Error fetching user groups:', error);
        res.status(500).json({ error: 'Error fetching user groups' });
    }
};

// Controller to create a new group
exports.createGroup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;

    if (req.userType === 'Company') {
        return res.status(403).json({ error: "Not authorized to create groups." });
    }

    try {
        const group = new Groups({
            name,
            description,
            createdBy: req.user.id, // Use req.user.id from fetchUser middleware
            members: [req.user.id]  // Add the creator as the first member
        });

        const savedGroup = await group.save();
        res.json(savedGroup);
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller to join a group
exports.joinGroup = async (req, res) => {
    try {
        const group = await Groups.findById(req.params.groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        // Check if user is already a member
        if (!group.members.includes(req.user.id)) {
            group.members.push(req.user.id);
            await group.save();
        }

        res.json(group);
    } catch (error) {
        console.error('Error joining group:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
