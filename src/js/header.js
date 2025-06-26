// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const body = document.body;

// Open mobile menu
function openMobileMenu() {
  mobileMenuBackdrop.classList.add('is-open');
  mobileMenuBtn.classList.add('is-active');
  mobileMenuBtn.setAttribute('aria-expanded', 'true');
  mobileMenuBtn.setAttribute('aria-label', 'Close mobile menu');
  body.style.overflow = 'hidden'; // Prevent body scroll when menu is open
}

// Close mobile menu
function closeMobileMenu() {
  mobileMenuBackdrop.classList.remove('is-open');
  mobileMenuBtn.classList.remove('is-active');
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
  mobileMenuBtn.setAttribute('aria-label', 'Open mobile menu');
  body.style.overflow = ''; // Restore body scroll
}

// Toggle mobile menu
function toggleMobileMenu() {
  if (mobileMenuBackdrop.classList.contains('is-open')) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

// Event listeners
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

// Close button in mobile menu
if (mobileMenuCloseBtn) {
  mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
}

// Close menu when clicking on backdrop (but not on the menu itself)
if (mobileMenuBackdrop) {
  mobileMenuBackdrop.addEventListener('click', (e) => {
    if (e.target === mobileMenuBackdrop) {
      closeMobileMenu();
    }
  });
}

// Close menu when clicking on navigation links
mobileNavLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenuBackdrop.classList.contains('is-open')) {
    closeMobileMenu();
  }
});

// Update active state based on current page/section
function updateActiveNavState() {
  const currentHash = window.location.hash || '#';

  // Desktop nav
  const desktopNavLinks = document.querySelectorAll('.nav-link');
  desktopNavLinks.forEach(link => {
    const linkHash = link.getAttribute('href');
    const navItem = link.closest('.nav-item');

    if (linkHash === currentHash || (currentHash === '#' && linkHash === './#')) {
      navItem.classList.add('selected');
    } else {
      navItem.classList.remove('selected');
    }
  });

  // Mobile nav
  mobileNavLinks.forEach(link => {
    const linkHash = link.getAttribute('href');

    if (linkHash === currentHash || (currentHash === '#' && linkHash === './#')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Update active state on page load and hash change
window.addEventListener('load', updateActiveNavState);
window.addEventListener('hashchange', updateActiveNavState);
