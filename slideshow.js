document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
  
    function showSlide(index) {
      slides[currentSlide].classList.remove('active');
      slides[index].classList.add('active');
      currentSlide = index;
    }
  
    function nextSlide() {
      let nextIndex = (currentSlide + 1) % slides.length;
      showSlide(nextIndex);
    }
  
    setInterval(nextSlide, 6000); // Change slide every 6 seconds (5 seconds still + 1 second transition)
  });