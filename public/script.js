// JavaScript to show/hide sections
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';

    // Update active button
    document.querySelectorAll('.nav-button').forEach(button => {
        button.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}
const image = document.getElementById("center");
image.addEventListener("mouseenter",()=> {
    image.src = "icons/upsetcoin.png"
});
image.addEventListener("mouseleave", () => {
    image.src = "icons/winkcoin.png"; // Replace with the original image's filename
});



// Timer for the #timerButton
function startTimer() {
    const timerButton = document.getElementById('timerButton');
    setInterval(() => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timerButton.textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000);
}

// Start the timer when the page loads
document.addEventListener('DOMContentLoaded', startTimer);

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

function confirmAmount() {
    const amount = document.getElementById('amountInput').value;
    if (amount) {
        // Here you can add the logic to process the amount
        alert(`Amount confirmed: ${amount}`);
        closeEnterAmountModal();
    } else {
        alert('Please enter an amount');
    }
}

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
