let currentSlide = 0;
let slides = [];
let dots = [];
let autoPlayInterval;

// Variables for touch events
let touchStartX = 0;
let touchCurrentX = 0;
let isSwiping = false;

function updateHeroLink(index) {
  const heroLink = document.getElementById('__hero_link');
  heroLink.href = slides[index].getAttribute('data-link');
  heroLink.textContent = slides[index].getAttribute('data-name');
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

  const slideshowContainer = document.getElementById('hero-player-slideshow');
  slideshowContainer.style.transition = 'transform 0.3s ease';
  slideshowContainer.style.transform = `translateX(-${index * 100}%)`;

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
  touchCurrentX = touchStartX;
  isSwiping = true;

  const slideshowContainer = document.getElementById('hero-player-slideshow');
  slideshowContainer.style.transition = 'none'; // Disable smooth transition during swipe
}

function handleTouchMove(event) {
  if (!isSwiping) return;

  touchCurrentX = event.touches[0].clientX; // Update the current touch position
  const swipeDistance = touchCurrentX - touchStartX;

  const slideshowContainer = document.getElementById('hero-player-slideshow');
  slideshowContainer.style.transform = `translateX(${-currentSlide * 100 + (swipeDistance / slideshowContainer.offsetWidth) * 100}%)`;
}

function handleTouchEnd() {
  if (!isSwiping) return;

  isSwiping = false;
  const swipeDistance = touchCurrentX - touchStartX;
  const swipeThreshold = document.getElementById('hero-player-slideshow').offsetWidth / 4;

  if (swipeDistance > swipeThreshold) {
    // Swipe right (previous slide)
    prevSlide();
  } else if (swipeDistance < -swipeThreshold) {
    // Swipe left (next slide)
    nextSlide();
  } else {
    // Snap back to the current slide
    showSlides(currentSlide);
  }

  resetAutoPlay(); // Reset autoplay after swiping
}

document.addEventListener('DOMContentLoaded', function() {
  slides = document.querySelectorAll('.slide');
  dots = document.querySelectorAll('.dot');
  
  if (slides.length && dots.length) {
    const slideshowContainer = document.getElementById('hero-player-slideshow');
    slideshowContainer.style.display = 'flex';
    slideshowContainer.style.transform = `translateX(0%)`; // Ensure proper starting position

    showSlides(0);
    startAutoPlay(); // Begin autoplay on load

    // Add touch event listeners for swipe gestures
    slideshowContainer.addEventListener('touchstart', handleTouchStart);
    slideshowContainer.addEventListener('touchmove', handleTouchMove);
    slideshowContainer.addEventListener('touchend', handleTouchEnd);
  }
});
