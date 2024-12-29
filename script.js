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
function showEnterAmountModal() {
    const modal = document.getElementById('enterAmountModal');
    modal.style.display = 'block';
  }
  
  // Close the modal
  function closeEnterAmountModal() {
    const modal = document.getElementById('enterAmountModal');
    modal.style.display = 'none';
  }
  
  // Add event listeners
  document.getElementById('closeModalButton').addEventListener('click', closeEnterAmountModal);
  

  // laoding page 

  // Hide the loading page after the content is loaded
// Hide the loading page after 3 seconds
window.addEventListener('load', () => {
    setTimeout(() => {
      const loadingPage = document.getElementById('loadingPage');
      loadingPage.style.display = 'none'; // Hide the loading page
    }, 3000); // 3000 milliseconds = 3 seconds
  });
  
  