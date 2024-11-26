document.addEventListener('DOMContentLoaded', function() {
  var blipSound = document.getElementById('blipSound');
  var clickSound = document.getElementById('clickSound');
  var homeLink = document.getElementById('homeLink');
  var workLink = document.getElementById('workLink');
  var bioLink = document.getElementById('bioLink');
  var viewWorkButton = document.getElementById('viewWorkButton');
  var homePic = document.getElementById('homePic');

  function playBlipSound() {
    blipSound.currentTime = 0; // Reset sound to start
    blipSound.play();
  }

  function playClickSound() {
    clickSound.currentTime = 0; // Reset sound to start
    clickSound.play();
  }

  // Play the click sound once when the page loads
  playClickSound();

  homeLink.addEventListener('mouseenter', playBlipSound);
  workLink.addEventListener('mouseenter', playBlipSound);
  bioLink.addEventListener('mouseenter', playBlipSound);
  viewWorkButton.addEventListener('mouseenter', playBlipSound);
  viewWorkButton.addEventListener('mouseenter', playBlipSound);
  homePic.addEventListener('mouseenter', playBlipSound);
});