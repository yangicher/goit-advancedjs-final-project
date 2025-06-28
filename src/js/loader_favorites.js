document.addEventListener('DOMContentLoaded', () => {
  // === Elements ===
  const desktopHomeLink = document.querySelector('.nav-link[href="./#"]');
  const desktopFavLink = document.querySelector('.nav-link[href="./favorites.html"]');

  const mobileHomeLink = document.querySelector('.mobile-nav-link[href="./#"]');
  const mobileFavLink = document.querySelector('.mobile-nav-link[href="#favorites"]');

  const favSection = document.querySelector('.favorites-section');
  const exercisesPage = document.querySelector('.exercises-page');
  const footerSection = document.querySelector('.section.footer');
  const quoteSection = document.querySelector('.quote');

  const mobileMenu = document.getElementById('mobile-menu-backdrop');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');

  // === Utils ===
  function closeMobileMenu() {
    if (mobileMenu) {
      mobileMenu.classList.remove('is-open');
      mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    }
  }

  function clearNavSelection() {
    document.querySelectorAll('.nav-item').forEach(li => li.classList.remove('selected'));
    document.querySelectorAll('.mobile-nav-link').forEach(link => link.classList.remove('active'));
  }

  function showFavorites() {
    favSection?.classList.remove('hidden');
    if (favSection) favSection.style.display = 'block';
    if (exercisesPage) exercisesPage.style.display = 'none';
    if (footerSection) footerSection.style.display = 'none';
    if (quoteSection) quoteSection.style.display = 'none';

    clearNavSelection();
    desktopFavLink?.closest('.nav-item')?.classList.add('selected');
    mobileFavLink?.classList.add('active');

    closeMobileMenu();
  }

  function showHome() {
    if (favSection) favSection.style.display = 'none';
    if (exercisesPage) exercisesPage.style.display = 'block';
    if (footerSection) footerSection.style.display = 'block';
    if (quoteSection) quoteSection.style.display = 'block';

    clearNavSelection();
    desktopHomeLink?.closest('.nav-item')?.classList.add('selected');
    mobileHomeLink?.classList.add('active');

    closeMobileMenu();
  }

  // === Event Listeners ===
  desktopHomeLink?.addEventListener('click', (e) => {
    e.preventDefault();
    showHome();
  });

  desktopFavLink?.addEventListener('click', (e) => {
    e.preventDefault();
    showFavorites();
  });

  mobileHomeLink?.addEventListener('click', (e) => {
    e.preventDefault();
    showHome();
  });

  mobileFavLink?.addEventListener('click', (e) => {
    e.preventDefault();
    showFavorites();
  });
});
