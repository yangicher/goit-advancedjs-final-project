import { get } from './api';

window.addEventListener('DOMContentLoaded', async () => {
  const quoteUrl = './partials/quote.html';
  const isDesktop = window.innerWidth >= 1440;

  try {
    const response = await fetch(quoteUrl);
    if (!response.ok) throw new Error('Не вдалося завантажити quote.html');
    const quoteContent = await response.text();

    if (isDesktop) {
      const sidebar = document.querySelector('.exercises-sidebar');
      if (!sidebar) {
        console.error('Не знайдено елемент .exercises-sidebar');
        return;
      }
      sidebar.innerHTML = quoteContent;
    } else {
      const exercisesPage = document.querySelector('.exercises-page');
      if (!exercisesPage) {
        console.error('Не знайдено елемент .exercises-page');
        return;
      }

      console.log(quoteContent);
      exercisesPage.insertAdjacentHTML('afterend', quoteContent);
    }

    await checkAndUpdateData();
  } catch (error) {
    console.error('Помилка завантаження quote.html:', error);
  }
});

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
