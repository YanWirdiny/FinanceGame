// Import required modules
const express = require('express');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Dilemmas Data
const dilemmas = [
  { id: 1, description: 'Car repair after an accident', amount: 500, importance: 'High', category: 'Needs' },
  { id: 2, description: 'Medical emergency', amount: 1200, importance: 'High', category: 'Health' },
  { id: 3, description: 'Lost job - need rent', amount: 1000, importance: 'High', category: 'Needs' },
  { id: 4, description: 'Unexpected travel expenses', amount: 300, importance: 'Medium', category: 'Wants' },
  { id: 5, description: 'Broken phone replacement', amount: 200, importance: 'Low', category: 'Wants' },
  { id: 6, description: 'Car maintenance', amount: 150, importance: 'Medium', category: 'Needs' },
  { id: 7, description: 'Pet medical care', amount: 400, importance: 'Medium', category: 'Health' },
  { id: 8, description: 'Child school fees', amount: 800, importance: 'High', category: 'Needs' },
  { id: 9, description: 'Home appliance repair', amount: 250, importance: 'Low', category: 'Wants' },
  { id: 10, description: 'Unpaid utility bills', amount: 100, importance: 'High', category: 'Needs' },
  { id: 11, description: 'Car towing fees', amount: 120, importance: 'Medium', category: 'Needs' },
  { id: 12, description: 'Funeral expenses', amount: 1500, importance: 'High', category: 'Needs' },
  { id: 13, description: 'Household emergency', amount: 600, importance: 'Medium', category: 'Needs' },
  { id: 14, description: 'Child’s unexpected needs', amount: 100, importance: 'Low', category: 'Needs' },
  { id: 15, description: 'Urgent loan repayment', amount: 800, importance: 'High', category: 'Financial' },
  { id: 16, description: 'Emergency dental care', amount: 500, importance: 'High', category: 'Health' },
  { id: 17, description: 'Legal fees for a dispute', amount: 1000, importance: 'Medium', category: 'Financial' },
  { id: 18, description: 'Lost luggage replacement', amount: 350, importance: 'Low', category: 'Wants' },
  { id: 19, description: 'Vehicle registration renewal', amount: 150, importance: 'Medium', category: 'Needs' },
  { id: 20, description: 'Emergency home repairs', amount: 900, importance: 'High', category: 'Needs' }
];

// Routes
// Get all dilemmas
app.get('/dilemmas', (req, res) => {
  res.json(dilemmas);
});

// Get a random dilemma
app.get('/dilemmas/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * dilemmas.length);
  res.json(dilemmas[randomIndex]);
});

// Get dilemmas by category
app.get('/dilemmas/:category', (req, res) => {
  const { category } = req.params;
  const filteredDilemmas = dilemmas.filter(d => d.category.toLowerCase() === category.toLowerCase());
  if (filteredDilemmas.length > 0) {
    res.json(filteredDilemmas);
  } else {
    res.status(404).json({ message: 'No dilemmas found for the specified category.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
