// Get all slideshow images
const images = document.querySelectorAll('.slideshow-image');
let currentIndex = 0;

// Show the first image initially
images[currentIndex].classList.add('active');

// Function to switch to the next image
function showNextImage() {
    // Hide the current image
    images[currentIndex].classList.remove('active');
    
    // Move to the next image (loop back to 0 if at the end)
    currentIndex = (currentIndex + 1) % images.length;
    
    // Show the next image
    images[currentIndex].classList.add('active');
}

// Change image every 3 seconds (3000 milliseconds)
setInterval(showNextImage, 3000);

// Log a knightly greeting
console.log("By the Woof of Doge, the realm salutes thee!");