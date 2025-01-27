// Import required modules
const express = require('express');
const cors = require('cors');
const path = require('path');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Logging Middleware
app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});

// Dilemmas Data
const dilemmas = [
    { id: 1, description: 'Car repair after an accident', amount: 500, importance: 'High', category: 'Needs' },
    // (Add other dilemmas here)
];

// Financial Literacy Definitions
const financialDefinitions = [
    { term: "Budgeting", definition: "The process of creating a plan to manage your income, expenses, and savings over a period of time." },
    // (Add other definitions here)
];

// Routes
app.get('/dilemmas', (req, res) => res.json(dilemmas));
app.get('/dilemmas/random', (req, res) => res.json(dilemmas[Math.floor(Math.random() * dilemmas.length)]));
app.get('/dilemmas/:category', (req, res) => {
    const filtered = dilemmas.filter(d => d.category.toLowerCase() === req.params.category.toLowerCase());
    filtered.length ? res.json(filtered) : res.status(404).json({ error: 'No dilemmas found for this category.' });
});

app.get('/api/financial-definition', (req, res) => {
    res.json(financialDefinitions[Math.floor(Math.random() * financialDefinitions.length)]);
});

app.get('/api', (req, res) => {
    res.json({
        availableRoutes: {
            dilemmas: "/dilemmas",
            randomDilemma: "/dilemmas/random",
            dilemmaByCategory: "/dilemmas/:category",
            randomDefinition: "/api/financial-definition"
        }
    });
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'gamefinanceonVscode.html'));
});

// Catch-all for invalid routes
app.use((req, res) => {
    res.status(404).json({ error: "Endpoint not found" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
