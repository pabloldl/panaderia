/* Navegación móvil: el contenido sigue disponible sin JavaScript. */
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
if (menuButton && menu) {
  document.documentElement.classList.add('js');
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
  };
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menu.classList.toggle('is-open', !isOpen);
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
  const desktopQuery = window.matchMedia('(min-width: 761px)');
  desktopQuery.addEventListener('change', closeMenu);
}

/* Aparición suave al entrar en pantalla; respeta movimiento reducido. */
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        entry.target.classList.remove('is-pending');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(section => {
    section.classList.add('is-pending');
    observer.observe(section);
  });
  reducedMotion.addEventListener('change', event => {
    if (event.matches) {
      document.querySelectorAll('.is-pending').forEach(section => section.classList.remove('is-pending'));
      observer.disconnect();
    }
  });
}

/* Año actualizado automáticamente. */
const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());
