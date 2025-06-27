let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const container = document.getElementById('favoritesList');

// === Якщо порожньо — показати повідомлення ===
if (favorites.length === 0) {
  container.innerHTML = `<p class="no-favorites-msg">
    It appears that you haven't added any exercises to your favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.
  </p>`;
} else {
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
          <button class="start-btn">Start <span class="arrow"><img src="/img/icons/start-arrow.svg" alt="Start" /></span></button>
        </div>
        <div class="exercise-middle-row">
          <div class="exercise-icon"><img src="/img/icons/exercise-icon.svg" /></div>
          <h3 class="exercise-title">${exercise.name}</h3>
        </div>
        <div class="exercise-bottom-row">
          <span><span class="meta-label">Burned calories:</span> <span class="meta-value">${exercise.burnedCalories}</span></span>
          <span><span class="meta-label">Body part:</span> <span class="meta-value">${exercise.bodyPart}</span></span>
          <span><span class="meta-label">Target:</span> <span class="meta-value">${exercise.target}</span></span>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// === Видалити вправу з фаворитів ===
function removeFromFavorites(id) {
  favorites = favorites.filter(ex => ex.id !== id);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  const cardToRemove = document.querySelector(`.exercise-card[data-id="${id}"]`);
  if (cardToRemove) {
    cardToRemove.remove();
  }

  if (favorites.length === 0) {
    container.innerHTML = `<p class="no-favorites-msg">
      It appears that you haven't added any exercises to your favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.
    </p>`;
  }
}

// === Обробник кліку по кнопці видалення ===
container.addEventListener('click', e => {
  if (e.target.classList.contains('remove-btn')) {
    const id = e.target.dataset.id;
    removeFromFavorites(id);
  }
});

// === Функція для отримання фаворитів з localStorage ===
export const getFavorites = () => {
  const stored = localStorage.getItem('favorites');
  try {
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to parse favorites:', e);
    return [];
  }
};

































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
