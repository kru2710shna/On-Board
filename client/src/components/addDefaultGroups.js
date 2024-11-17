// addDefaultGroups.js

const mongoose = require('mongoose');
const Group = require('./models/Group');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const defaultGroups = [
    { name: 'On-Board Learning', description: 'A community for learning and growing together on the On-Board platform.' },
    { name: 'Mentors', description: 'Connect with mentors and get guidance for your career and skills.' },
    { name: 'Technical Skills and Skill Development', description: 'Join to improve your technical skills and find resources for development.' },
    { name: 'Lectures on Neural Networks', description: 'A group focused on discussions and lectures about Neural Networks.' },
    { name: 'Law Majors Students', description: 'A space for law majors to connect, collaborate, and share knowledge.' }
];

const seedGroups = async () => {
    try {
        await Group.insertMany(defaultGroups);
        console.log('Default groups added successfully.');
    } catch (error) {
        console.error('Error adding default groups:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedGroups();
