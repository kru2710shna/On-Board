import Groups from  '../models/Groups.js'
import { validationResult } from 'express-validator';

// Controller to get all groups (optional, if needed)
export const getGroups  = async (req, res) => {
    try {
        const groups = await Groups.find();
        return res.json(groups); // Ensure only one response is sent
    } catch (error) {
        console.error('Error fetching groups:', error);
        res.status(500).json({ error: 'Error fetching groups' });
    }
};

// Controller to get groups for a specific user
export const getUserGroups = async (req, res) => {
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
export const createGroup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, members } = req.body;

    if (req.userType === 'Company') {
        return res.status(403).json({ error: "Not authorized to create groups." });
    }

    try {
        // Validate and ensure `members` is an array of valid user IDs
        const memberSet = new Set(members || []); // Use a Set to handle duplicates
        memberSet.add(req.user.id); // Add the creator to the members

        const group = new Groups({
            name,
            description,
            createdBy: req.user.id, // Use req.user.id from fetchUser middleware
            members: Array.from(memberSet), // Convert Set back to an array
        });

        const savedGroup = await group.save();
        res.json(savedGroup);
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller to join a group
export const joinGroup= async (req, res) => {
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


export const sendMessageToGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { text } = req.body;

        const group = await Groups.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        const newMessage = {
            text,
            senderId: req.user.id,
            senderName: req.user.name, // Assuming `name` is part of the user model
            timestamp: new Date(),
        };

        group.messages = group.messages || []; // Ensure messages array exists
        group.messages.push(newMessage);

        await group.save();
        res.json(newMessage);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const deleteGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const userId = req.user.id;

        const group = await Groups.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        // Only allow the creator to delete the group
        if (group.createdBy.toString() !== userId) {
            return res.status(403).json({ error: 'Not authorized to delete this group' });
        }

        await Groups.findByIdAndDelete(groupId);
        res.json({ message: 'Group deleted successfully' });
    } catch (error) {
        console.error('Error deleting group:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Controller to get group details
export const getGroupDetails = async (req, res) => {
    try {
        const { groupId } = req.params;

        // Find the group and populate member details
        const group = await Groups.findById(groupId).populate('members', 'name email');
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        res.json(group); // Return the group details
    } catch (error) {
        console.error('Error fetching group details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getGroupMembers = async (req, res) => {
    try {
        const { groupId } = req.params;

        if (!groupId) {
            return res.status(400).json({ error: "Group ID is required" });
        }

        console.log(`Fetching members for group ID: ${groupId}`);

        const group = await Groups.findById(groupId).populate('members', 'name email');
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        res.json({ members: group.members });
    } catch (error) {
        console.error('Error fetching group members:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
