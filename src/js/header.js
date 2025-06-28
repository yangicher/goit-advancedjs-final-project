const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const body = document.body;

function openMobileMenu() {
  mobileMenuBackdrop.classList.add('is-open');
  mobileMenuBtn.classList.add('is-active');
  mobileMenuBtn.setAttribute('aria-expanded', 'true');
  mobileMenuBtn.setAttribute('aria-label', 'Close mobile menu');
  body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenuBackdrop.classList.remove('is-open');
  mobileMenuBtn.classList.remove('is-active');
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
  mobileMenuBtn.setAttribute('aria-label', 'Open mobile menu');
  body.style.overflow = '';
}

function toggleMobileMenu() {
  if (mobileMenuBackdrop.classList.contains('is-open')) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

if (mobileMenuCloseBtn) {
  mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
}

if (mobileMenuBackdrop) {
  mobileMenuBackdrop.addEventListener('click', (e) => {
    if (e.target === mobileMenuBackdrop) {
      closeMobileMenu();
    }
  });
}

mobileNavLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenuBackdrop.classList.contains('is-open')) {
    closeMobileMenu();
  }
});

function updateActiveNavState() {
  const isOnFavorites = window.location.pathname.includes('favorites');
  const targetPath = isOnFavorites ? 'favorites' : 'index.html';

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('selected', link.href.includes(targetPath));
  });

  mobileNavLinks.forEach(link => {
    link.classList.toggle('active', link.href.includes(targetPath));
  });
}

document.addEventListener('DOMContentLoaded', updateActiveNavState);
