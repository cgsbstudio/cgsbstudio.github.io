function toggleMenu() {

    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('menu-open');

    const overlay = document.createElement('div');
      overlay.id = 'overlay';
      overlay.style.position = 'fixed';
      overlay.style.top = 0;
      overlay.style.left = 0;
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      overlay.style.zIndex = 10;
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    overlay.addEventListener('click', function() {
        menu.classList.remove('menu-open');
        document.body.removeChild(overlay);
        document.body.style.overflow = 'auto';
        });

    document.addEventListener('click', function(event) {
      const menu = document.getElementById('mobileMenu');
      const burger = document.querySelector('.burger');
      if (!menu.contains(event.target) && !burger.contains(event.target)) {
        menu.classList.remove('menu-open');
        document.body.removeChild(overlay);
        document.body.style.overflow = 'auto';
      }
    });
  }