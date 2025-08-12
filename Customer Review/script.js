let slideIndex = 0;
let slideInterval;

showSlides(slideIndex);

// Function to change the slide
function changeSlide(n) {
  showSlides((slideIndex += n));
  // Reset the interval
  clearInterval(slideInterval);
  slideInterval = setInterval(() => changeSlide(1), 5000);
}

// Main function to display slides
function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("review-slide");

  if (n >= slides.length) {
    slideIndex = 0;
  }
  if (n < 0) {
    slideIndex = slides.length - 1;
  }

  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Display the current slide
  slides[slideIndex].style.display = "block";
}

// Auto-sliding functionality
slideInterval = setInterval(() => changeSlide(1), 5000); // Change image every 5 seconds
