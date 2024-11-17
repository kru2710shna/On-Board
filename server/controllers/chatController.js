const axios = require('axios');
require('dotenv').config();
const User = require('../models/User');

const getChatResponse = async (req, res) => {
    const { userInput } = req.body;
    const openaiApiKey = process.env.OPEN_AI_API_KEY;
    const userId = req.user.id;

    const fullPrompt = `The user is asking for information on jobs in the USA. Provide specific information about popular job sectors, high-demand skills, and the current job market in the USA. Format the response with line breaks for better readability. The user's question was: "${userInput}"`;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: 'davinci-002',
                prompt: fullPrompt,
                max_tokens: 300,
                temperature: 0.5,
            },
            {
                headers: {
                    'Authorization': `Bearer ${openaiApiKey}`,
                }
            }
        );

        const botResponse = response.data.choices[0].text.trim();
        res.json({ botResponse });
    } catch (error) {
        console.error("Error in OpenAI API call:", error.response ? error.response.data : error.message);
        
        // Send back a detailed error response for debugging
        res.status(500).json({ error: error.response ? error.response.data : "An unknown error occurred with OpenAI API." });
    }
};


module.exports = { getChatResponse };