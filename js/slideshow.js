let currentSlide = 0;
let slides = [];
let dots = [];
let autoPlayInterval;

// Variables for touch events
let touchStartX = 0;
let touchEndX = 0;

function updateHeroLink(index) {
  const heroLink = document.getElementById('__hero_link');
  heroLink.href = slides[index].getAttribute('data-link');
  
  let linkText = slides[index].getAttribute('data-client') + ' ' + slides[index].getAttribute('data-name') + '';
  heroLink.innerHTML = linkText;
}

function updateActiveClasses(index) {
  slides[currentSlide]?.classList.remove('active');
  slides[index]?.classList.add('active');
  
  dots[currentSlide]?.classList.remove('selected');
  dots[index]?.classList.add('selected');
}

function showSlides(index) {
  if (!slides.length || !dots.length) return;

  updateActiveClasses(index);
  updateHeroLink(index);

  document.getElementById('hero-player-slideshow').onclick = function() {
    window.location.href = slides[index]?.getAttribute('data-link');
  };

  currentSlide = index;
}

function nextSlide() {
  const nextIndex = (currentSlide + 1) % slides.length;
  showSlides(nextIndex);
}

function prevSlide() {
  const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
  showSlides(prevIndex);
}

function clickSlide(index) {
  showSlides(index);
  resetAutoPlay(); // Reset autoplay whenever the user interacts
}

function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 5000); // Advance slides every 5 seconds
}

function resetAutoPlay() {
  clearInterval(autoPlayInterval); // Clear the current interval
  startAutoPlay(); // Restart the autoplay interval
}

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX; // Record the starting touch position
}

function handleTouchEnd(event) {
  touchEndX = event.changedTouches[0].clientX; // Record the ending touch position
  handleSwipeGesture(); // Determine the swipe direction
}

function handleSwipeGesture() {
  const swipeDistance = touchEndX - touchStartX;

  if (swipeDistance > 50) {
    // Swipe right (previous slide)
    prevSlide();
    resetAutoPlay();
  } else if (swipeDistance < -50) {
    // Swipe left (next slide)
    nextSlide();
    resetAutoPlay();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  slides = document.querySelectorAll('.slide');
  dots = document.querySelectorAll('.dot');
  
  if (slides.length && dots.length) {
    showSlides(0);
    startAutoPlay(); // Begin autoplay on load

    const slideshowContainer = document.getElementById('hero-player-slideshow');

    // Add touch event listeners for swipe gestures
    slideshowContainer.addEventListener('touchstart', handleTouchStart);
    slideshowContainer.addEventListener('touchend', handleTouchEnd);
  }
});