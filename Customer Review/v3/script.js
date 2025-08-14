document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".review-slider");
  const track = document.querySelector(".slider-track");
  const slides = Array.from(track.children);
  const nextButton = document.querySelector(".next");
  const prevButton = document.querySelector(".prev");

  let currentIndex = 0;
  let autoSlideInterval;

  const updateSlider = () => {
    // Get the width of a single slide element, including its padding
    const slideWidth = slides[0].offsetWidth;

    // Calculate the offset to center the active slide
    const sliderWidth = slider.offsetWidth;
    const centerOffset = (sliderWidth - slideWidth) / 2;

    // Calculate the total translation for the track
    // This is the centering offset minus the distance to the current slide
    const transformValue = centerOffset - currentIndex * slideWidth;

    track.style.transform = `translateX(${transformValue}px)`;

    // Update active class for all slides
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentIndex);
    });
  };

  const moveTo = (newIndex) => {
    // Loop around if the index goes out of bounds
    currentIndex = (newIndex + slides.length) % slides.length;
    updateSlider();
    // Reset the auto-slide timer whenever the user interacts
    startAutoSlide();
  };

  // Function to reset and start the auto-sliding timer
  const startAutoSlide = () => {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => moveTo(currentIndex + 1), 4000); // Slide every 4 seconds
  };

  // Add event listeners for the buttons
  nextButton.addEventListener("click", () => moveTo(currentIndex + 1));
  prevButton.addEventListener("click", () => moveTo(currentIndex - 1));

  // CRITICAL: Update the slider layout on window resize to maintain centering
  window.addEventListener("resize", updateSlider);

  // Initial setup
  // A small delay ensures all elements are rendered before the first calculation
  setTimeout(() => {
    updateSlider();
    startAutoSlide();
  }, 100);
});
