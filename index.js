// Import required modules
const express = require('express');
const cors = require('cors');
const path = require('path');
const AWS = require('aws-sdk'); // AWS SDK for Cognito
<<<<<<< HEAD
const crypto = require('crypto');
=======

>>>>>>> 298947db51210f3dbab5b2778940e7768e6b7f94
// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// AWS Cognito Configuration (Modify these values)
const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'us-east-2' }); // Change region if needed
const USER_POOL_ID = 'us-east-2_0xKqZyFTL'; // Replace with your actual User Pool ID
const CLIENT_ID = '4qlio4qdode8131qcmaptc4tj5'; // Replace with your actual App Client ID
//const SECRET = 'bb4kslagl5m7gp84h5uvd120lpmp3jgqecjlmlrk9plou9u7mgq'


// function generateSecretHash(username, clientId, clientSecret) {
//     return crypto
//         .createHmac('SHA256', clientSecret)
//         .update(username + clientId)
//         .digest('base64');
// }
=======

// AWS Cognito Configuration (Modify these values)
// AWS Cognito Configuration (Modify these values)
const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'us-east-1' }); // Change region if needed
const USER_POOL_ID = 'your-user-pool-id'; // Replace with your actual User Pool ID
const CLIENT_ID = 'your-app-client-id'; // Replace with your actual App Client ID
>>>>>>> 298947db51210f3dbab5b2778940e7768e6b7f94

// Logging Middleware
app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});

<<<<<<< HEAD
// --- Dilemmas and Financial Definitions --- //
const dilemmas = [
    { id: 1, description: 'Car repair after an accident', amount: 500, importance: 'High', category: 'Needs', expectedDecision: "yes", expectedCategory: "Savings" },
    { id: 2, description: 'Medical bill', amount: 200, importance: 'High', category: 'Needs', expectedDecision: "yes", expectedCategory: "Needs" },
    { id: 3, description: 'Luxury vacation', amount: 1000, importance: 'Low', category: 'Wants', expectedDecision: "no", expectedCategory: null },
    { id: 4, description: 'Laptop upgrade for work', amount: 700, importance: 'Medium', category: 'Needs', expectedDecision: "yes", expectedCategory: "Savings" }
];

const financialDefinitions = [
    { term: "Budgeting", definition: "The process of creating a plan to manage your income, expenses, and savings over a period of time." },
    { term: "Emergency Fund", definition: "A savings buffer for unexpected expenses like medical bills or car repairs." }
];

// --- Game State --- //
let points = 0;
let level = 1;

// --- API Routes --- //
app.get('/dilemmas', (req, res) => {
    console.log("Dilemmas API called");  // Debugging log
    res.json(dilemmas);
});

app.get('/dilemmas/random', (req, res) => res.json(dilemmas[Math.floor(Math.random() * dilemmas.length)]));

app.get('/dilemmas/:category', (req, res) => {
    const filtered = dilemmas.filter(d => d.category.toLowerCase() === req.params.category.toLowerCase());
    filtered.length ? res.json(filtered) : res.status(404).json({ error: 'No dilemmas found for this category.' });
});

app.get('/api/financial-definition', (req, res) => {
    console.log("Financial Definition API called");  // Debugging log
    res.json(financialDefinitions[Math.floor(Math.random() * financialDefinitions.length)]);
});

// --- User Authentication Routes --- //
app.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;
   // const secretHash = generateSecretHash(username, CLIENT_ID, SECRET);
=======
// User Signup Endpoint (Handles user registration)
app.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;
>>>>>>> 298947db51210f3dbab5b2778940e7768e6b7f94
    const params = {
        ClientId: CLIENT_ID,
        Username: username,
        Password: password,
<<<<<<< HEAD
      //  SECRET_HASH: secretHash,
=======
>>>>>>> 298947db51210f3dbab5b2778940e7768e6b7f94
        UserAttributes: [{ Name: 'email', Value: email }]
    };

    try {
        await cognito.signUp(params).promise();
        res.json({ message: 'User registered successfully! Please check your email for verification.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

<<<<<<< HEAD
app.post('/confirm-signup', async (req, res) => {
    const { username, verificationCode } = req.body;

    const params = {
        ClientId: CLIENT_ID,
        Username: username,
        ConfirmationCode: verificationCode
    };

    try {
        await cognito.confirmSignUp(params).promise();
        res.json({ message: 'Your account has been successfully verified!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    //const secretHash = generateSecretHash(username, CLIENT_ID, SECRET);
=======
// User Login Endpoint (Handles user authentication)
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
>>>>>>> 298947db51210f3dbab5b2778940e7768e6b7f94
    const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: CLIENT_ID,
        AuthParameters: {
            USERNAME: username,
<<<<<<< HEAD
            PASSWORD: password,
           // SECRET_HASH: secretHash

=======
            PASSWORD: password
>>>>>>> 298947db51210f3dbab5b2778940e7768e6b7f94
        }
    };

    try {
        const authResponse = await cognito.initiateAuth(params).promise();
        res.json({ token: authResponse.AuthenticationResult.IdToken });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

<<<<<<< HEAD
=======
// Verify Token Endpoint (Ensures user is authenticated)
>>>>>>> 298947db51210f3dbab5b2778940e7768e6b7f94
app.post('/verify-token', async (req, res) => {
    const { token } = req.body;
    try {
        const decodedToken = await cognito.getUser({ AccessToken: token }).promise();
        res.json({ user: decodedToken });
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
});

<<<<<<< HEAD
// Serve static files (Ensure this runs only once)
=======
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
>>>>>>> 298947db51210f3dbab5b2778940e7768e6b7f94
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
<<<<<<< HEAD
});
=======
});
>>>>>>> 298947db51210f3dbab5b2778940e7768e6b7f94
