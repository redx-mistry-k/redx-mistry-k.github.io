document.addEventListener("DOMContentLoaded", function() {
    var noButton = document.getElementById("noButton");
    var boundary = 15; // Distance in pixels to trigger the move

    document.addEventListener("mousemove", function(event) {
        var rect = noButton.getBoundingClientRect();
        var x = event.clientX;
        var y = event.clientY;

        // Check if the mouse is within the boundary of the button
        if (x > rect.left - boundary && x < rect.right + boundary &&
            y > rect.top - boundary && y < rect.bottom + boundary) {
            
            moveButton();
        }
    });

    function moveButton() {
        var newX = Math.random() * (window.innerWidth - noButton.clientWidth);
        var newY = Math.random() * (window.innerHeight - noButton.clientHeight);
        noButton.style.left = newX + 'px';
        noButton.style.top = newY + 'px';
        noButton.style.position = 'fixed';
    }
});
document.getElementById("yesButton").addEventListener("click", function() {
    for (let i = 0; i < 20; i++) {
        let heart = document.createElement("div");
        heart.classList.add("heart");
        heart.style.left = Math.random() * 100 + "vw";
        document.getElementById("heartContainer").appendChild(heart);

        // Remove the heart after animation ends
        setTimeout(() => heart.remove(), 5000);
    }
});
