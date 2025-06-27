import { get } from './api';

let quoteContent = '';
let currentMode = '';

window.addEventListener('DOMContentLoaded', async () => {
  try {
    quoteContent = await loadQuoteHTML();
    renderQuote();
    await checkAndUpdateData();
  } catch (error) {
    console.error('Помилка ініціалізації:', error);
  }
});

window.addEventListener('resize', () => {
  const newMode = window.innerWidth >= 1440 ? 'desktop' : 'mobile';
  if (newMode !== currentMode) {
    renderQuote();
  }
});

async function loadQuoteHTML() {
  const quoteUrl = '../partials/quote.html';
  const response = await fetch(quoteUrl);
  if (!response.ok) throw new Error('Не вдалося завантажити quote.html');
  return await response.text();
}

function renderQuote() {
  const isDesktop = window.innerWidth >= 1440;
  currentMode = isDesktop ? 'desktop' : 'mobile';

  const sidebar = document.querySelector('.exercises-sidebar');
  const exercisesPage = document.querySelector('.exercises-page');

  const existing = document.querySelector('.js-quote-container');
  if (existing) existing.remove();

  const wrapper = document.createElement('div');
  wrapper.className = 'js-quote-container';
  wrapper.innerHTML = quoteContent;

  if (isDesktop && sidebar) {
    sidebar.innerHTML = '';
    sidebar.appendChild(wrapper);
  } else if (!isDesktop && exercisesPage) {
    wrapper.classList.add('container');
    exercisesPage.insertAdjacentElement('afterend', wrapper);
  }
  checkAndUpdateData();
}

async function checkAndUpdateData() {
  const stored = localStorage.getItem('quoteData');
  const today = new Date().toISOString().slice(0, 10);

  if (stored) {
    const data = JSON.parse(stored);
    if (data.date === today) {
      updateHTML(data);
      return;
    }
  }

  const data = await get('quote');

  const dataToStore = {
    date: today,
    author: data.author,
    quote: data.quote,
  };

  localStorage.setItem('quoteData', JSON.stringify(dataToStore));
  updateHTML(dataToStore);
}

function updateHTML(data) {
  const quoteElem = document.querySelector('.js-quote');
  const authorElem = document.querySelector('.js-author');

  if (!data || !quoteElem || !authorElem) return;

  quoteElem.textContent = data.quote;
  authorElem.textContent = data.author;
}
