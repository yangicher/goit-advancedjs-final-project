import { get } from './api';

// Check and update quote data when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  await checkAndUpdateData();
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
