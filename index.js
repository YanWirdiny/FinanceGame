// Import required modules
const express = require('express');
const cors = require('cors');
const path = require('path');
const AWS = require('aws-sdk'); // AWS SDK for Cognito

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());


// AWS Cognito Configuration (Modify these values)
// AWS Cognito Configuration (Modify these values)
const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'us-east-1' }); // Change region if needed
const USER_POOL_ID = 'your-user-pool-id'; // Replace with your actual User Pool ID
const CLIENT_ID = 'your-app-client-id'; // Replace with your actual App Client ID

// Logging Middleware
app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});

// User Signup Endpoint (Handles user registration)
app.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;
    const params = {
        ClientId: CLIENT_ID,
        Username: username,
        Password: password,
        UserAttributes: [{ Name: 'email', Value: email }]
    };

    try {
        await cognito.signUp(params).promise();
        res.json({ message: 'User registered successfully! Please check your email for verification.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// User Login Endpoint (Handles user authentication)
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: CLIENT_ID,
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password
        }
    };

    try {
        const authResponse = await cognito.initiateAuth(params).promise();
        res.json({ token: authResponse.AuthenticationResult.IdToken });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Verify Token Endpoint (Ensures user is authenticated)
app.post('/verify-token', async (req, res) => {
    const { token } = req.body;
    try {
        const decodedToken = await cognito.getUser({ AccessToken: token }).promise();
        res.json({ user: decodedToken });
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
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
// Logging Middleware
app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});

// Dilemmas Data
const dilemmas = [
    { id: 1, description: 'Car repair after an accident', amount: 500, importance: 'High', category: 'Needs', expectedDecision: "yes", expectedCategory: "Savings" },
    { id: 2, description: 'Medical bill', amount: 200, importance: 'High', category: 'Needs', expectedDecision: "yes", expectedCategory: "Needs" },
    { id: 3, description: 'Luxury vacation', amount: 1000, importance: 'Low', category: 'Wants', expectedDecision: "no", expectedCategory: null },
    { id: 4, description: 'Laptop upgrade for work', amount: 700, importance: 'Medium', category: 'Needs', expectedDecision: "yes", expectedCategory: "Savings" }
];

// Financial Literacy Definitions
const financialDefinitions = [
    { term: "Budgeting", definition: "The process of creating a plan to manage your income, expenses, and savings over a period of time." },
    { term: "Emergency Fund", definition: "A savings buffer for unexpected expenses like medical bills or car repairs." }
];

let points = 0;
let level = 1;

// Routes
app.get('/dilemmas', (req, res) => res.json(dilemmas));
app.get('/dilemmas/random', (req, res) => res.json(dilemmas[Math.floor(Math.random() * dilemmas.length)]));
app.get('/dilemmas/:category', (req, res) => {
    const filtered = dilemmas.filter(d => d.category.toLowerCase() === req.params.category.toLowerCase());
    filtered.length ? res.json(filtered) : res.status(404).json({ error: 'No dilemmas found for this category.' });
});

// Update game state based on user's decision
app.post('/update-game', (req, res) => {
    const { decision, category, dilemmaId } = req.body;
    const dilemma = dilemmas.find(d => d.id === dilemmaId);

    if (!dilemma) {
        return res.status(404).json({ error: 'Dilemma not found' });
    }

    let earnedPoint = false;
    if (decision === dilemma.expectedDecision) {
        if (decision === "yes" && category.toLowerCase() === dilemma.expectedCategory.toLowerCase()) {
            points++;
            earnedPoint = true;
        } else if (decision === "no") {
            points++;
            earnedPoint = true;
        }
    }

    if (points >= 4) {
        level++;
        points = 0;
    }

    res.json({ message: earnedPoint ? "Point awarded!" : "No points earned.", points, level });
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
            randomDefinition: "/api/financial-definition",
            updateGame: "/update-game"
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
