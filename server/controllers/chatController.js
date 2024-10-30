const axios = require('axios');
require('dotenv').config();

const getChatResponse = async (req, res) => {
    const { userInput } = req.body;
    const openaiApiKey = process.env.OPEN_AI_API_KEY;

    // Simplified prompt without repeating the question context
    const fullPrompt = `Provide specific information about job opportunities, popular fields, and job market trends in the USA.`;

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
        res.status(500).json({ error: "An error occurred with OpenAI API." });
    }
};
module.exports = { getChatResponse };
