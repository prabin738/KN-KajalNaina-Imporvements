document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".slider-track");
  const slides = Array.from(track.children);
  const nextButton = document.querySelector(".next");
  const prevButton = document.querySelector(".prev");

  let currentIndex = 0;
  const slideWidth = slides[0].getBoundingClientRect().width + 40; // width + margin

  const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + "px";
  };
  slides.forEach(setSlidePosition);

  const moveToSlide = (track, currentSlide, targetSlide) => {
    if (!targetSlide) return;
    const amountToMove = targetSlide.style.left;
    track.style.transform = `translateX(-${amountToMove})`;
    currentSlide.classList.remove("active");
    targetSlide.classList.add("active");
  };

  const updateSlidePositions = () => {
    const centerOffset =
      document.querySelector(".review-slider").offsetWidth / 2 -
      slides[0].offsetWidth / 2;
    track.style.transform = `translateX(${
      centerOffset - currentIndex * slideWidth
    }px)`;

    slides.forEach((slide, index) => {
      if (index === currentIndex) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });
  };

  nextButton.addEventListener("click", (e) => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlidePositions();
  });

  prevButton.addEventListener("click", (e) => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlidePositions();
  });

  // Initial position
  updateSlidePositions();

  // Auto-slide functionality
  setInterval(() => {
    nextButton.click();
  }, 5000); // Change slide every 5 seconds
});
