// JavaScript to show/hide sections

const image = document.getElementById("center");
image.addEventListener("mouseenter",()=> {
    image.src = "icons/upsetcoin.png"
});
image.addEventListener("mouseleave", () => {
    image.src = "icons/winkcoin.png"; // Replace with the original image's filename
});


// Function to show the custom alert
function showCustomAlert(message) {
    const alertBox = document.getElementById("customAlert");
    const alertMessage = document.getElementById("alertMessage");

    alertMessage.innerText = message; // Set the alert message
    alertBox.classList.remove("hidden"); // Show the alert
}

// Function to close the custom alert
function closeCustomAlert() {
    const alertBox = document.getElementById("customAlert");
    alertBox.classList.add("hidden"); // Hide the alert
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
            alert('The countdown has ended.');
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



 function  distributeAmount(){
     const  amountInput = document.getElementById('amountInput').value;
     const  totalAmount =  parseFloat(amountInput);

     if (isNaN(totalAmount) || totalAmount <= 0) {
        showCustomAlert('Please enter a valid amount.');
        return;
    }
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
        alert('Please enter an amount');
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


// Function to show the emergency expense modal

function updatePointsDisplay() {
    console.log('Updating Points Display:', points);
    const pointsElement = document.querySelector(".list-group-item:nth-child(2)");
    pointsElement.innerText = `Points: ${points}`;
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

    alert(`$${amount} has been deducted from ${category}`);
}


// Function to deduct expense from the chosen category
function deductExpense(category) {
    console.log('Category:', category, 'Expected Category:', currentExpense.expectedCategory);
    if (category === currentExpense.expectedCategory) {
        console.log('Correct Decision Made');
        points++;
        alert(" you win one point ")
        updatePointsDisplay();
        closeEmergencyModal();;
    } else {
        console.log('Incorrect Category Chosen');
        alert("Incorrect category. No points awarded.");
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
        points++;
        alert(" you win one point ")
        updatePointsDisplay();
        closeEmergencyModal();
        }if(decision == "yes"){
            //show  caetgory of choice
            document.getElementById('categorySelection').style.display = " block";
        }
    } 
    
    if(decision !== currentExpense.expectedDecision) {
        console.log('Incorrect Decision Made');
        alert("Incorrect answer. No points awarded.");
        closeEmergencyModal();
    }
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



// Trigger the emergency expense modal every 2 minutes for testing
//setInterval(showEmergencyModal, .7* 60 * 1000);






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

