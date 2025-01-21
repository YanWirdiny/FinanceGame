const express = require('express'); 
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html as the default page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'gamefinanceonVscode.html'));
});

// API endpoint to fetch financial advice
app.post('/api/financial-advice', async (req, res) => {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        console.error('Error: Missing API key in .env file.');
        return res.status(500).json({ error: 'API key not configured.' });
    }

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are an assistant providing financial advice.' },
                { role: 'user', content: 'Provide a short financial advice tip with a verifiable source.' }
            ],
            max_tokens: 50,
            temperature: 0.7,
        }, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });

        res.json({ advice: response.data.choices[0].message.content.trim() });
    } catch (error) {
        console.error('Error fetching advice:', error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || 'Failed to fetch advice' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
