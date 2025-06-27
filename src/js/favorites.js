// === Створити 20 карток, якщо localStorage порожній ===
if (!localStorage.getItem('favorites')) {
  const mockFavorites = [];

  for (let i = 1; i <= 20; i++) {
    mockFavorites.push({
      id: String(i),
      name: `Exercise ${i}`,
      calories: 20 + i,
      target: i % 2 === 0 ? "Strength" : "Cardio",
      bodyPart: i % 3 === 0 ? "Legs" : i % 3 === 1 ? "Core" : "Full Body"
    });
  }

  localStorage.setItem('favorites', JSON.stringify(mockFavorites));
}

// === Отримати збережені вправи з localStorage ===
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const container = document.getElementById('favoritesList');

// === Якщо порожньо — показати повідомлення ===
if (favorites.length === 0) {
  container.innerHTML = `<p class="no-favorites-msg">
    It appears that you haven't added any exercises to your favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.
  </p>`;
} else {
  // === Інакше рендеримо всі картки ===
  favorites.forEach(exercise => {
    const card = document.createElement('div');
    card.className = 'exercise-card';
    card.dataset.id = exercise.id;

    card.innerHTML = `
      <div class="exercise-item">
        <div class="exercise-top-row">
          <div class="workout-rating-left">
            <div class="workout-badge">WORKOUT</div>
            <img class="icon-top remove-btn" src="./img/icons/trash-01.svg" alt="Trash Icon" data-id="${exercise.id}">
          </div>
          <button class="start-btn">
            Start <span class="arrow">→</span>
          </button>
        </div>
        <div class="exercise-middle-row">
          <img class="exercise-icon" src="./img/icons/icon.svg" alt="Lightning Icon">
          <h3 class="exercise-title">${exercise.name}</h3>
        </div>
        <div class="meta-line">
          <span><span class="meta-label">Burned calories:</span> <span class="meta-value">${exercise.calories} / 3 min</span></span>
          &nbsp;|&nbsp;
          <span><span class="meta-label">Body part:</span> <span class="meta-value">${exercise.bodyPart}</span></span>
          &nbsp;|&nbsp;
          <span><span class="meta-label">Target:</span> <span class="meta-value">${exercise.target}</span></span>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// === Видалити вправу по id ===
function removeFromFavorites(id) {
  favorites = favorites.filter(ex => ex.id !== id);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  // Видалити DOM-елемент
  const cardToRemove = document.querySelector(`.exercise-card[data-id="${id}"]`);
  if (cardToRemove) {
    cardToRemove.remove();
  }

  // Якщо не залишилось карток — показати повідомлення
  if (favorites.length === 0) {
    container.innerHTML = `<p class="no-favorites-msg">
      It appears that you haven't added any exercises to your favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.
    </p>`;
  }
}

// === Делегування події на іконку "Trash" ===
container.addEventListener('click', e => {
  if (e.target.classList.contains('remove-btn')) {
    const id = e.target.dataset.id;
    removeFromFavorites(id);
  }
});

// === Завантажити цитату дня ===
async function fetchQuoteOfTheDay() {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const saved = JSON.parse(localStorage.getItem('quoteOfTheDay'));

  if (saved && saved.date === today) {
    document.getElementById('quoteText').textContent = saved.quote;
    return;
  }

  try {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    const quote = data.content;

    document.getElementById('quoteText').textContent = quote;

    localStorage.setItem('quoteOfTheDay', JSON.stringify({
      quote,
      date: today
    }));
  } catch (error) {
    document.getElementById('quoteText').textContent = 'Failed to load quote.';
    console.error('Quote fetch error:', error);
  }
}

fetchQuoteOfTheDay();























import { get } from './api';

window.addEventListener('DOMContentLoaded', async () => {
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

  try {
    const data = await get('quote');

    const dataToStore = {
      date: today,
      author: data.author,
      quote: data.quote,
    };

    localStorage.setItem('quoteData', JSON.stringify(dataToStore));
    updateHTML(dataToStore);
  } catch (error) {
    console.error('Не вдалося отримати цитату:', error);
  }
}

function updateHTML(data) {
  const quoteElem = document.querySelector('.js-quote');
  const authorElem = document.querySelector('.js-author');

  if (!data || !quoteElem || !authorElem) {
    console.warn('Не знайдено елементи для вставки цитати');
    return;
  }

  quoteElem.textContent = data.quote;
  authorElem.textContent = data.author;
}
