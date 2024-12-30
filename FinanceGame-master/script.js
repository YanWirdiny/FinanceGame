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
        // Check if 24 hours have passed since last update
        const lastUpdate = localStorage.getItem('lastAdviceUpdate');
        const now = new Date().getTime();
        
        if (!lastUpdate || (now - parseInt(lastUpdate)) > 24 * 60 * 60 * 1000) {
            // Array of financial advice with sources
            const adviceList = [
                {
                    advice: "Create an emergency fund that covers 3-6 months of expenses to protect against unexpected costs.",
                    source: "Source: Dave Ramsey's Financial Peace"
                },
                {
                    advice: "Follow the 50/30/20 rule: Spend 50% on needs, 30% on wants, and save 20% of your income.",
                    source: "Source: Senator Elizabeth Warren, 'All Your Worth'"
                },
                {
                    advice: "Pay yourself first - automatically save a portion of your income before spending on other things.",
                    source: "Source: 'The Richest Man in Babylon' by George S. Clason"
                },
                {
                    advice: "Invest in low-cost index funds for long-term wealth building.",
                    source: "Source: Warren Buffett, Berkshire Hathaway Annual Letter"
                },
                {
                    advice: "Use the 24-hour rule: Wait 24 hours before making any major purchase to avoid impulse buying.",
                    source: "Source: Financial Planning Association"
                },
                {
                    advice: "Keep your fixed expenses below 50% of your take-home pay to maintain financial flexibility.",
                    source: "Source: Suze Orman's Financial Security"
                }
            ];

            // Randomly select advice
            const randomIndex = Math.floor(Math.random() * adviceList.length);
            const todaysAdvice = adviceList[randomIndex];

            // Update the DOM
            document.getElementById('financial-advice').textContent = todaysAdvice.advice;
            document.getElementById('advice-source').textContent = todaysAdvice.source;
            document.getElementById('last-updated').textContent = `Updated: ${new Date().toLocaleDateString()}`;

            // Save to localStorage
            localStorage.setItem('currentAdvice', JSON.stringify(todaysAdvice));
            localStorage.setItem('lastAdviceUpdate', now.toString());
        } else {
            // Load existing advice from localStorage
            const savedAdvice = JSON.parse(localStorage.getItem('currentAdvice'));
            if (savedAdvice) {
                document.getElementById('financial-advice').textContent = savedAdvice.advice;
                document.getElementById('advice-source').textContent = savedAdvice.source;
                document.getElementById('last-updated').textContent = `Updated: ${new Date(parseInt(lastUpdate)).toLocaleDateString()}`;
            }
        }
    } catch (error) {
        console.error('Error updating financial advice:', error);
        document.getElementById('financial-advice').textContent = 'Unable to load financial advice. Please try again later.';
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
