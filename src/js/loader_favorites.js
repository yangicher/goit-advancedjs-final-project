document.addEventListener('DOMContentLoaded', () => {
  const homeLink = document.querySelector('.nav-link[href="./#"]');
  const favLink  = document.querySelector('.nav-link[href="./favorites.html"]');

  const favSection     = document.querySelector('.favorites-section');
  const exercisesPage  = document.querySelector('.exercises-page');
  const footerSection  = document.querySelector('.section.footer');
  const quoteSection   = document.querySelector('.quote');

  function clearMenuSelection() {
    document.querySelectorAll('.nav-item').forEach(li => li.classList.remove('selected'));
  }

  favLink.addEventListener('click', (e) => {
    e.preventDefault();

    if (favSection)     favSection.style.display     = 'block';
    if (exercisesPage)  exercisesPage.style.display  = 'none';
    if (footerSection)  footerSection.style.display  = 'none';
    if (quoteSection)   quoteSection.style.display   = 'none'; // ❗️Приховати

    clearMenuSelection();
    favLink.parentElement.classList.add('selected');
  });

  homeLink.addEventListener('click', (e) => {
    e.preventDefault();

    if (favSection)     favSection.style.display     = 'none';
    if (exercisesPage)  exercisesPage.style.display  = 'block';
    if (footerSection)  footerSection.style.display  = 'block';
    if (quoteSection)   quoteSection.style.display   = 'block'; // ❗️Показати

    clearMenuSelection();
    homeLink.parentElement.classList.add('selected');
  });
});
