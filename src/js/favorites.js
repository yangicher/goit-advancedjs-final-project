import { ExercisesList } from './exercises-list';
import Modal from './modal';
import { get } from './api';

<<<<<<< HEAD

container.innerHTML = '';


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
          <button class="start-btn" data-exercise-id="${exercise._id}">Start <span class="arrow">
            <svg width="16" height="16" viewBox="0 0 16 16" style="stroke: #242424;">
              <use href="./img/icons.svg#icon-arrow-start"></use>
            </svg>
          </span></button>
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

container.addEventListener('click', e => {
  if (e.target.classList.contains('remove-btn')) {
    const id = e.target.dataset.id;
    removeFromFavorites(id);
  }
});


=======
// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeFavorites();
  checkAndUpdateData();
});

function initializeFavorites() {
  // Initialize favorites from localStorage
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const container = document.getElementById('favoritesList');

  if (!container) {
    return;
  }

  const modal = new Modal();

  // Initialize ExercisesList component for favorites
  const exercisesList = new ExercisesList({
    container: container,
    showRating: false,
    showRemoveBtn: true,
    onStartClick: (exerciseId) => {
      console.log('Favorites onStartClick called with ID:', exerciseId); // Debug log
      const exercise = favorites.find(ex => (ex._id || ex.id) === exerciseId);
      console.log('Exercise found in favorites:', exercise); // Debug log
      if (exercise) {
        modal.showModal(exercise);
      } else {
        console.error('Exercise not found in favorites for ID:', exerciseId);
      }
    },
    onRemoveClick: (exerciseId) => {
      removeFromFavorites(exerciseId, exercisesList);
    }
  });

  // Render initial favorites
  exercisesList.render(favorites);
}

// === Remove exercise from favorites ===
function removeFromFavorites(id, exercisesList) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites = favorites.filter(ex => (ex._id || ex.id) !== id);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  // Use the component's method to remove the exercise
  exercisesList.removeExercise(id);
}

// === Export function to get favorites ===
>>>>>>> main
export const getFavorites = () => {
  const stored = localStorage.getItem('favorites');
  try {
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to parse favorites:', e);
    return [];
  }
};

// === Quote functionality ===
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










