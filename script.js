// Bounce the DogeKnight logo on click
document.getElementById('doge-logo').addEventListener('click', function() {
    this.style.transform = 'scale(1.2)'; // Grow slightly
    setTimeout(() => {
        this.style.transform = 'scale(1)'; // Back to normal
    }, 300); // 0.3s bounce
});

// Optional: Log a knightly greeting to the console
console.log("By the Woof of Doge, the realm salutes thee!");
