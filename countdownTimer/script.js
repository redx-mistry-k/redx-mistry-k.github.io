// Set the target date and time
const endDate = new Date("May 16, 2025 20:45:00").getTime();

// Update the timer every second
const x = setInterval(updateTimer, 1000);

function updateTimer() {
    const now = new Date().getTime();
    const distance = endDate - now;

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update the DOM
    document.getElementById("days").textContent = days.toString().padStart(2, "0");
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");

    // Update the progress bar
    const totalTime = endDate - new Date("January 1, 2025 00:00:00").getTime();
    const progress = ((totalTime - distance) / totalTime) * 100;
    document.getElementById("progress").style.width = `${progress}%`;

    // Handle timer expiration
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "<div class='expired'>EXPIRED</div>";
        document.getElementById("progress").style.width = "100%";
    }
}

// Add fade-in animation to the hero section
window.addEventListener('load', () => {
    const heroSection = document.querySelector('.hero');
    heroSection.classList.add('visible');
});
