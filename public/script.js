// JavaScript to show/hide sections

const image = document.getElementById("center");
image.addEventListener("mouseenter",()=> {
    image.src = "icons/winkcoin.png"
});
image.addEventListener("mouseleave", () => {
    image.src = "icons/happycoin.png "; // Replace with the original image's filename
});


// Function to show the custom alert
function showCustomAlert(message) {
    const alertBox = document.getElementById("customAlert");
    const alertMessage = document.getElementById("alertMessage");

    alertMessage.innerText = message; // Set the alert message
    alertBox.classList.remove
    ('hidden'); // Show the alert

    const alertSound = new Audio("icons/90s-game-ui-6-185099.mp3");
    alertSound.play();

    setTimeout(()=> {
        closeCustomAlert();
    }, 3000);

}

// Function to close the custom alert
function closeCustomAlert() {
     const alertBox = document.getElementById('customAlert');
    alertBox.classList.add('hidden');
}


// Timer for the #timerButton
let countdownInterval;

// Function to start the countdown timer
function startCountdown() {
    const timerButton = document.getElementById('timerButton');
    let remainingTime = 24 * 60 * 60; // 24 hours in seconds

    // Clear any existing interval
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    // Update the timer every second
    countdownInterval = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            timerButton.textContent = '00:00:00'; // Timer expired
            showCustomAlert('The countdown has ended.');
            return;
        }

        // Calculate hours, minutes, and seconds
        const hours = Math.floor(remainingTime / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((remainingTime % 3600) / 60).toString().padStart(2, '0');
        const seconds = (remainingTime % 60).toString().padStart(2, '0');

        // Update the timer display
        timerButton.textContent = `${hours}:${minutes}:${seconds}`;
        remainingTime--;
    }, 1000);
}

// Function to reset and start the countdown when an amount is added
function resetCountdown() {
    startCountdown(); // Restart the countdown timer
}

/* Modal  nfor entering  money 

*/
// Show the modal
// Modal functions
function showEnterAmountModal() {
    const modal = document.getElementById('enterAmountModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeEnterAmountModal() {
    const modal = document.getElementById('enterAmountModal');
    if (modal) {
        modal.style.display = 'none';
    }
}
// hwo to play modal 


// Function to show the "How to Play" modal
function showHowToPlayModal() {
    const modal = document.getElementById('howToPlayModal');
    modal.style.display = 'block'; // Show the modal
}

// Function to close the "How to Play" modal
function closeHowToPlayModal() {
    const modal = document.getElementById('howToPlayModal');
    modal.style.display = 'none'; // Hide the modal
}

// Optional: Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('howToPlayModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};


// animation 
function highlightCard(cardId) {
    const card = document.getElementById(cardId);
    
    // Add a temporary highlight animation
    card.style.transition = 'background-color 0.5s, transform 0.5s';
    card.style.backgroundColor = '#d4edda'; // Light green for success
    card.style.transform = 'scale(1.1)'; // Slightly enlarge the card

    // Reset after the animation
    setTimeout(() => {
        card.style.backgroundColor = ''; // Reset background color
        card.style.transform = 'scale(1)'; // Reset size
    }, 1000); // Duration of the effect
}

// Wallet object to manage balance and categories
const wallet = {
    maxBalance: 1000, // Set the maximum balance for the wallet
    currentBalance: 1000, // Initial balance
};

// Function to update wallet UI
function updateWalletUI() {
    const walletBalanceElement = document.getElementById("walletBalance");
    if (walletBalanceElement) {
        walletBalanceElement.innerText = `$${wallet.currentBalance.toFixed(2)}`;
    }
}

 function  distributeAmount(){
     const  amountInput = document.getElementById('amountInput').value;
     const  totalAmount =  parseFloat(amountInput);

     if (isNaN(totalAmount) || totalAmount <= 0) {
        showCustomAlert('Please enter a valid amount.');
        return;
    }
     if (totalAmount > wallet.currentBalance){
        showCustomAlert("Insuficient Amount !!")
        return;
     }
     wallet.currentBalance -= totalAmount;
     updateWalletUI();

    const savings = (totalAmount * 0.5).toFixed(2); // 50% for savings
    const expenses = (totalAmount * 0.3).toFixed(2); // 30% for expenses
    const other = (totalAmount * 0.2).toFixed(2);  // 20 %  for   others 

     document.getElementById('SavingButton').innerText = `$${savings}`;
     document.getElementById('Expensebutton').innerText = `$${expenses}`;
     document.getElementById('otherbutton').innerText = `$${other}`;
     highlightCard('SavingButton');
     highlightCard('Expensebutton');
     highlightCard('otherbutton');
     resetCountdown();
     showCustomAlert(`$${amount} deducted. Remaining wallet balance: $${wallet.currentBalance}`);


     closeEnterAmountModal();


 }
 function confirmAmount() {
    const amount = document.getElementById('amountInput').value;
    if (amount) {
        // Here you can add the logic to process the amount
        distributeAmount();
        showCustomAlert(`Amount confirmed: ${amount}`);
        closeEnterAmountModal();
    } else {
        showCustomAlert('Please enter an amount');
    }
    
}
document.addEventListener('DOMContentLoaded', function () {
    startCountdown(); // Start the countdown timer
});
// Add event listeners when the document loads
document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.getElementById('closeModalButton');
    if (closeButton) {
        closeButton.addEventListener('click', closeEnterAmountModal);
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('enterAmountModal');
        if (event.target === modal) {
            closeEnterAmountModal();
        }
    });
});

function redirectToPage(pageUrl) {
    window.location.href = pageUrl;
}
// Emergency expense variables
let emergencyExpenses = [
//     {
//     description: "A sudden medical bill", 
//     amount: 50, 
//     importance: "High",
//     expectedDecision: "yes",
//     expectedCategory: "Needs"
// },
{ 
    description: "Car repair", 
    amount: 30, 
    importance: "Medium",
    expectedDecision: "yes",
    expectedCategory: "Savings"
},
{ 
    description: "Lost phone replacement", 
    amount: 20, 
    importance: "Low",
    expectedDecision: "no",
    expectedCategory: null // No category since the decision is "no"
},
];

let currentExpense = null;
let points = 0;
let level = 1;


// Function to show the emergency expense modal

function updatePointsDisplay() {
    console.log('Updating Points Display:', points);
    const pointsElement = document.querySelector(".list-group-item:nth-child(2)");
    pointsElement.innerText = `Points: ${points}`;
    const levelElement = document.querySelector(".list-group-item:nth-child(1)");
    levelElement.innerText = `Level: ${level}`;
}

function updateCategoryBalance(category, amount) {
    let buttonId;
    if (category.toLowerCase() === 'needs') buttonId = 'SavingButton';
    else if (category.toLowerCase() === 'wants') buttonId = 'Expensebutton';
    else if (category.toLowerCase() === 'savings') buttonId = 'otherbutton';

    console.log('Updating Balance for:', buttonId, 'Amount:', amount);

    const button = document.getElementById(buttonId);
    let currentBalance = parseFloat(button.innerText.replace("$", ""));
    if (isNaN(currentBalance)) currentBalance = 0;

    const newBalance = currentBalance - amount;
    button.innerText = `$${newBalance.toFixed(2)}`;

    showCustomAlert(`$${amount} has been deducted from ${category}`);
}


// Function to deduct expense from the chosen category
function deductExpense(category) {
    console.log('Category:', category, 'Expected Category:', currentExpense.expectedCategory);
    if (category === currentExpense.expectedCategory) {
        console.log('Correct Decision Made');
        incrementingPoints;
        showCustomAlert(" you win one point ")
        updatePointsDisplay();
        closeEmergencyModal();;
    } else {
        console.log('Incorrect Category Chosen');
        showCustomAlert("Incorrect category. No points awarded.");
        closeEmergencyModal();
    }

    // Deduct the expense from the selected category
    const expenseAmount = currentExpense.amount;
    updateCategoryBalance(category, expenseAmount);

    // Close the modal
    closeEmergencyModal();
}
// Function to handle user decision (Yes/No)
function handleExpense(decision) {
    console.log('Decision:', decision, 'Expected Decision:', currentExpense.expectedDecision);
    if (!(decision !== currentExpense.expectedDecision)) {
        if(decision === "no"){
        console.log('Correct Decision Made');
        incrementingPoints();
        showCustomAlert(" you win one point ")
        updatePointsDisplay();
        closeEmergencyModal();
        }if(decision == "yes"){
            //show  caetgory of choice
            document.getElementById('categorySelection').style.display = " block";
        }
    } 
    
    if(decision !== currentExpense.expectedDecision) {
        console.log('Incorrect Decision Made');
        showCustomAlert("Incorrect answer. No points awarded.");
        closeEmergencyModal();
    }
}

function incrementingPoints(){
    points++;
    if(points >=4){
        incrementingLevel();   
        points= 0
    }
    updatePointsDisplay();
}
function incrementingLevel(){
    level++;
    showCustomAlert("you have reached the next level")
}
function showEmergencyModal() {
    const modal = document.getElementById("emergencyModal");

    // Select a random expense
    currentExpense = emergencyExpenses[Math.floor(Math.random() * emergencyExpenses.length)];

    // Update modal content
    document.getElementById("expenseDescription").innerText = currentExpense.description;
    document.getElementById("expenseValue").innerText = currentExpense.amount;
    document.getElementById("expenseImportance").innerText = currentExpense.importance;

    modal.style.display = "block";
}

function closeEmergencyModal() {
    const modal = document.getElementById('emergencyModal');
    if (modal) {
        modal.style.display = 'none';
    }
}



// api call  for 
async function showEmergencyModal() {
    const modal = document.getElementById("emergencyModal");

    try {
        // Fetch a random dilemma from the API
        const response = await fetch('http://localhost:3000/dilemmas/random');
        if (!response.ok) {
            throw new Error('Failed to fetch dilemma');
        }

        const dilemma = await response.json();
        currentExpense = dilemma; // Store the fetched dilemma for further logic

        // Update modal content dynamically
        document.getElementById("expenseDescription").innerText = dilemma.description;
        document.getElementById("expenseValue").innerText = `$${dilemma.amount}`;
        document.getElementById("expenseImportance").innerText = dilemma.importance;

        // Display the modal
        modal.style.display = "block";
    } catch (error) {
        console.error('Error fetching dilemma:', error);
        showCustomAlert('Error fetching emergency dilemma. Please try again.');
    }
}


// create a function  that   add 1 to the streak after  each  24 hours 
let streak = 0;
 
function  startStreakUpdater(){
    const streakElement = document.querySelector(".list-group-item:nth-child(3)");

    // Load streak from localStorage (to persist streak after refreshing)
    if (localStorage.getItem("streak")) {
        streak = parseInt(localStorage.getItem("streak"), 10);
        streakElement.innerText = `Streak: ${streak}`
}

setInterval( () => {
    streak++;
    streakElement.innerText = `Streak: ${streak}`;
    localStorage.setItem("streak",streak); // to save to local storage 
    showCustomAlert(" congratulations ! your  streak as been updated ")
}, 24 * 60 *60 * 1000)
}
// Trigger the emergency expense modal every 2 minutes for testing
//setInterval(showEmergencyModal, .7* 60 * 1000);

document.addEventListener("DOMContentLoaded", ()=> {
     startStreakUpdater();
});




// advice card  
// Function to fetch and display financial advice
async function updateFinancialAdvice() {
    try {
        // Fetch financial advice from the backend API
        const response = await fetch('http://localhost:3000/api/financial-advice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch financial advice');
        }

        const data = await response.json();

        // Update the DOM with the fetched advice
        document.getElementById('financial-advice').textContent = data.advice;
        document.getElementById('advice-source').textContent = 'Source: AI Model';
        document.getElementById('last-updated').textContent = `Updated: ${new Date().toLocaleDateString()}`;
    } catch (error) {
        console.error('Error updating financial advice:', error);

        // Update placeholder text to reflect an error
        document.getElementById('financial-advice').textContent = 'Unable to load financial advice. Please try again later.';
        document.getElementById('advice-source').textContent = '';
        document.getElementById('last-updated').textContent = '';
    }
}


// Add this to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Your existing code...
    
    // Initialize financial advice
    updateFinancialAdvice();
    
    // Check for updates every hour
    setInterval(updateFinancialAdvice, 2000); // 5 second in milliseconds
});
