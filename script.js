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

