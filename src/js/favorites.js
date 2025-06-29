import { ExercisesList } from './exercises-list';
import Modal from './modal';
import { get } from './api';

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