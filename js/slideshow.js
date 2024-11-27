/*  The following is very close to working; bug is that it only drags one time on mobile. */

console.log('slideshow.js loaded');

let currentSlide = 0;
let slides = [];
let dots = [];
let autoPlayInterval;
let autoPlayStopped = false; // Flag to permanently stop autoplay

// Variables for touch events
let touchStartX = 0;
let touchCurrentX = 0;
let isDragging = false;

// Utility to get the width of a slide
function getSlideWidth() {
  return document.querySelector('.slideshow').clientWidth;
}

function updateHeroLink(index) {
  const heroLink = document.getElementById('__hero_link');
  heroLink.href = slides[index].getAttribute('data-link');
  
  let linkText = slides[index].getAttribute('data-client') + ' - ' + slides[index].getAttribute('data-name');
  heroLink.innerHTML = linkText;
}

function updateActiveClasses(index) {
  dots[currentSlide]?.classList.remove('selected');
  dots[index]?.classList.add('selected');
}

function showSlides(index) {
  const slideshowContainer = document.querySelector('.slides-container');
  slideshowContainer.style.transition = "transform .7s ease-in-out";
  slideshowContainer.style.transform = `translateX(-${index * 100}%)`;

  updateActiveClasses(index);
  updateHeroLink(index);
  currentSlide = index;

  // Update slide click action
  document.getElementById('hero-player-slideshow').onclick = () => {
    window.location.href = slides[index].getAttribute('data-link');
  };
}

function resetSlidePosition() {
  const slideshowContainer = document.querySelector('.slides-container');
  slideshowContainer.style.transition = "transform 0.7s ease-in-out";
  slideshowContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function startAutoPlay() {
  if (autoPlayStopped) return; // Prevent autoplay if stopped
  autoPlayInterval = setInterval(nextSlide, 5000); // Advance slides every 5 seconds
}

function resetAutoPlay() {
  if (autoPlayStopped) return; // Do not restart autoplay if permanently stopped
  clearInterval(autoPlayInterval); // Clear the current interval
  startAutoPlay(); // Restart the autoplay interval
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
  autoPlayStopped = true; // Permanently stop autoplay
}

function startDrag(event) {
  console.log('startDrag');
  event.preventDefault(); // Prevent scrolling during drag
  touchStartX = event.touches[0].clientX;
  touchCurrentX = touchStartX;
  isDragging = true;

  // Remove transition to allow smooth dragging
  const slideshowContainer = document.querySelector('.slides-container');
  slideshowContainer.style.transition = "none";

  stopAutoPlay(); // Stop autoplay permanently after user interaction
}

let throttleTimeout = null;
function duringDrag(event) {
  console.log('duringDrag');
  if (!isDragging) return;

  if (!throttleTimeout) {
    touchCurrentX = event.touches[0].clientX;
    const slideWidth = getSlideWidth();
    const offset = (touchCurrentX - touchStartX) / slideWidth * 100;

    const slideshowContainer = document.querySelector('.slides-container');
    slideshowContainer.style.transform = `translateX(calc(-${currentSlide * 100}% + ${offset}%))`;

    throttleTimeout = setTimeout(() => {
      throttleTimeout = null;
    }, 50); // Throttle interval in milliseconds
  }
}

function endDrag() {
  console.log('endDrag');
  if (!isDragging) return;

  const slideWidth = getSlideWidth();
  const swipeDistance = touchCurrentX - touchStartX;

  isDragging = false;

  if (Math.abs(swipeDistance) > slideWidth / 10) {
    // Determine direction
    if (swipeDistance < 0 && currentSlide < slides.length - 1) {
      showSlides(currentSlide + 1);
    } else if (swipeDistance > 0 && currentSlide > 0) {
      showSlides(currentSlide - 1);
    } else {
      resetSlidePosition();
    }
  } else {
    resetSlidePosition();
  }

  // Reset touch variables
  touchStartX = 0;
  touchCurrentX = 0;
}

function clickSlide(index) {
  //stopAutoPlay(); // Stop autoplay permanently when a dot is clicked
  showSlides(index);
}

function nextSlide() {
  console.log('nextSlide');
  const nextIndex = (currentSlide + 1) % slides.length;
  showSlides(nextIndex);
}

document.getElementById('hero-player-slideshow').style.display = 'block';
slides = document.querySelectorAll('.slide');
dots = document.querySelectorAll('.dot');

if (slides.length && dots.length) {
  const slideshowContainer = document.getElementById('hero-player-slideshow');
  slideshowContainer.innerHTML = `<div class="slides-container">${slideshowContainer.innerHTML}</div>`;
  showSlides(0);

  const slidesContainer = document.querySelector('.slides-container');
  slidesContainer.addEventListener('touchstart', startDrag);
  slidesContainer.addEventListener('touchmove', duringDrag);
  slidesContainer.addEventListener('touchend', endDrag);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => clickSlide(index));
  });

  startAutoPlay();
}










/*let currentSlide = 0;
let slides = [];
let dots = [];
let autoPlayInterval;

// Variables for touch events
let touchStartX = 0;
let touchCurrentX = 0;
let isDragging = false;

// Utility to get the width of a slide
function getSlideWidth() {
  return document.querySelector('.slideshow').clientWidth;
}

function updateHeroLink(index) {
  const heroLink = document.getElementById('__hero_link');
  heroLink.href = slides[index].getAttribute('data-link');
  
  let linkText = slides[index].getAttribute('data-client') + ' - ' + slides[index].getAttribute('data-name');
  heroLink.innerHTML = linkText;
}

function updateActiveClasses(index) {
  dots[currentSlide]?.classList.remove('selected');
  dots[index]?.classList.add('selected');
}

function showSlides(index) {
  const slideshowContainer = document.querySelector('.slides-container');
  slideshowContainer.style.transition = "transform .7s ease-in-out";
  slideshowContainer.style.transform = `translateX(-${index * 100}%)`;

  updateActiveClasses(index);
  updateHeroLink(index);
  currentSlide = index;

  // Update slide click action

  document.getElementById('hero-player-slideshow').onclick = () => {
    window.location.href = slides[index].getAttribute('data-link');
  };
}

function resetSlidePosition() {
  const slideshowContainer = document.querySelector('.slides-container');
  slideshowContainer.style.transition = "transform 0.7s ease-in-out";
  slideshowContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 5000); // Advance slides every 5 seconds
}

function resetAutoPlay() {
  clearInterval(autoPlayInterval); // Clear the current interval
  startAutoPlay(); // Restart the autoplay interval
}

function startDrag(event) {
  touchStartX = event.touches[0].clientX;
  touchCurrentX = touchStartX;
  isDragging = true;

  // Remove transition to allow smooth dragging
  const slideshowContainer = document.querySelector('.slides-container');
  slideshowContainer.style.transition = "none";
}

function duringDrag(event) {
  if (!isDragging) return;

  touchCurrentX = event.touches[0].clientX;
  const slideWidth = getSlideWidth();
  const offset = (touchCurrentX - touchStartX) / slideWidth * 100;

  const slideshowContainer = document.querySelector('.slides-container');
  slideshowContainer.style.transform = `translateX(calc(-${currentSlide * 100}% + ${offset}%))`;
}

function endDrag() {
  if (!isDragging) return;

  const slideWidth = getSlideWidth();
  const swipeDistance = touchCurrentX - touchStartX;

  isDragging = false;

  if (Math.abs(swipeDistance) > slideWidth / 3) {
    // Determine direction
    if (swipeDistance < 0 && currentSlide < slides.length - 1) {
      showSlides(currentSlide + 1);
    } else if (swipeDistance > 0 && currentSlide > 0) {
      showSlides(currentSlide - 1);
    } else {
      resetSlidePosition();
    }
  } else {
    resetSlidePosition();
  }
}

function clickSlide(index) {
  clearInterval(autoPlayInterval); // Stop autoplay when a dot is clicked
  showSlides(index);
  resetAutoPlay(); // Restart autoplay after the user interacts
}

document.addEventListener('DOMContentLoaded', function () {
  slides = document.querySelectorAll('.slide');
  dots = document.querySelectorAll('.dot');

  if (slides.length && dots.length) {
    const slideshowContainer = document.getElementById('hero-player-slideshow');
    slideshowContainer.innerHTML = `<div class="slides-container">${slideshowContainer.innerHTML}</div>`;
    showSlides(0);

    const slidesContainer = document.querySelector('.slides-container');
    slidesContainer.addEventListener('touchstart', startDrag);
    slidesContainer.addEventListener('touchmove', duringDrag);
    slidesContainer.addEventListener('touchend', endDrag);

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => clickSlide(index));
    });

    startAutoPlay();
  }
});

function nextSlide() {
  const nextIndex = (currentSlide + 1) % slides.length;
  showSlides(nextIndex);
}



*/











/*let currentSlide = 0;
let slides = [];
let dots = [];
let autoPlayInterval;

// Variables for touch events
let touchStartX = 0;
let touchCurrentX = 0;
let isDragging = false;

// Utility to get the width of a slide
function getSlideWidth() {
  return document.querySelector('.slideshow').clientWidth;
}

function updateHeroLink(index) {
  const heroLink = document.getElementById('__hero_link');
  heroLink.href = slides[index].getAttribute('data-link');
  
  let linkText = slides[index].getAttribute('data-client') + ' - ' + slides[index].getAttribute('data-name');
  heroLink.innerHTML = linkText;
}

function updateActiveClasses(index) {
  dots[currentSlide]?.classList.remove('selected');
  dots[index]?.classList.add('selected');
}

function showSlides(index) {
  const slideshowContainer = document.querySelector('.slides-container');
  slideshowContainer.style.transition = "transform .7s ease-in-out";
  slideshowContainer.style.transform = `translateX(-${index * 100}%)`;

  updateActiveClasses(index);
  updateHeroLink(index);
  currentSlide = index;
}

function resetSlidePosition() {
  const slideshowContainer = document.querySelector('.slides-container');
  slideshowContainer.style.transition = "transform 0.7s ease-in-out";
  slideshowContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 5000); // Advance slides every 5 seconds
}

function resetAutoPlay() {
  clearInterval(autoPlayInterval); // Clear the current interval
  startAutoPlay(); // Restart the autoplay interval
}

function startDrag(event) {
  touchStartX = event.touches[0].clientX;
  touchCurrentX = touchStartX;
  isDragging = true;

  // Remove transition to allow smooth dragging
  const slideshowContainer = document.querySelector('.slides-container');
  slideshowContainer.style.transition = "none";
}

function duringDrag(event) {
  if (!isDragging) return;

  touchCurrentX = event.touches[0].clientX;
  const slideWidth = getSlideWidth();
  const offset = (touchCurrentX - touchStartX) / slideWidth * 100;

  const slideshowContainer = document.querySelector('.slides-container');
  slideshowContainer.style.transform = `translateX(calc(-${currentSlide * 100}% + ${offset}%))`;
}

function endDrag() {
  if (!isDragging) return;

  const slideWidth = getSlideWidth();
  const swipeDistance = touchCurrentX - touchStartX;

  isDragging = false;

  if (Math.abs(swipeDistance) > slideWidth / 3) {
    // Determine direction
    if (swipeDistance < 0 && currentSlide < slides.length - 1) {
      showSlides(currentSlide + 1);
    } else if (swipeDistance > 0 && currentSlide > 0) {
      showSlides(currentSlide - 1);
    } else {
      resetSlidePosition();
    }
  } else {
    resetSlidePosition();
  }
}

function clickSlide(index) {
  clearInterval(autoPlayInterval); // Stop autoplay when a dot is clicked
  showSlides(index);
  startAutoPlay(); // Restart autoplay after the user interacts
}

document.addEventListener('DOMContentLoaded', function () {
  slides = document.querySelectorAll('.slide');
  dots = document.querySelectorAll('.dot');

  if (slides.length && dots.length) {
    const slideshowContainer = document.getElementById('hero-player-slideshow');
    slideshowContainer.innerHTML = `<div class="slides-container">${slideshowContainer.innerHTML}</div>`;
    showSlides(0);

    const slidesContainer = document.querySelector('.slides-container');
    slidesContainer.addEventListener('touchstart', startDrag);
    slidesContainer.addEventListener('touchmove', duringDrag);
    slidesContainer.addEventListener('touchend', endDrag);

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => clickSlide(index));
    });

    startAutoPlay();
  }
});

function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlides(nextIndex);
  }, 5000); // Advance slides every 5 seconds
}



*/








/*



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
  dots[currentSlide]?.classList.remove('selected');
  dots[index]?.classList.add('selected');
}

function showSlides(index) {
  if (!slides.length || !dots.length) return;

  updateActiveClasses(index);
  updateHeroLink(index);

  const slideshowContainer = document.querySelector('.slides-container');
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

document.addEventListener('DOMContentLoaded', function () {
  slides = document.querySelectorAll('.slide');
  dots = document.querySelectorAll('.dot');

  if (slides.length && dots.length) {
    const slideshowContainer = document.getElementById('hero-player-slideshow');
    slideshowContainer.innerHTML = `<div class="slides-container">${slideshowContainer.innerHTML}</div>`;
    showSlides(0);
    startAutoPlay();

    // Add touch event listeners for swipe gestures
    slideshowContainer.addEventListener('touchstart', handleTouchStart);
    slideshowContainer.addEventListener('touchend', handleTouchEnd);
  }
});

*/