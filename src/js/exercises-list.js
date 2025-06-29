// ===============================================
// SHARED EXERCISES LIST COMPONENT
// ===============================================

export class ExercisesList {
  constructor(options = {}) {
    this.container = options.container;
    this.showRating = options.showRating ?? true;
    this.showRemoveBtn = options.showRemoveBtn ?? false;
    this.onStartClick = options.onStartClick || (() => {});
    this.onRemoveClick = options.onRemoveClick || (() => {});
    this.customClass = options.customClass || '';
  }

  // Generate HTML for a single exercise card
  generateExerciseCard(exercise) {
    const ratingHtml = this.showRating ? `
      <div class="rating">
        ${exercise.rating} <span class="star">
          <svg width="14" height="14">
            <use href="./img/icons.svg#icon-star-full"></use>
          </svg>
        </span>
      </div>
    ` : '';

    const removeBtn = this.showRemoveBtn ? `
      <img class="icon-top remove-btn" src="./img/icons/trash-01.svg" alt="Trash Icon" data-id="${exercise._id || exercise.id}">
    ` : '';

    return `
      <div class="exercise-item ${this.customClass}" data-exercise-id="${exercise._id || exercise.id}">
        <div class="exercise-top-row">
          <div class="workout-rating-left">
            <div class="workout-badge">WORKOUT</div>
            ${this.showRating ? ratingHtml : removeBtn}
          </div>
          <button class="start-btn" data-exercise-id="${exercise._id || exercise.id}">
            Start
            <span class="arrow">
              <svg width="16" height="16" viewBox="0 0 16 16" style="stroke: #242424;">
                <use href="./img/icons.svg#icon-arrow-start"></use>
              </svg>
            </span>
          </button>
        </div>
        <div class="exercise-middle-row">
          <div class="exercise-icon">
            <svg width="20" height="20">
              <use href="./img/icons.svg#icon-runner"></use>
            </svg>
          </div>
          <h3 class="exercise-title">${exercise.name}</h3>
        </div>
        <div class="exercise-bottom-row">
          <span><span class="meta-label">Burned calories:</span> <span class="meta-value">${exercise.burnedCalories}</span></span>
          <span><span class="meta-label">Body part:</span> <span class="meta-value">${exercise.bodyPart}</span></span>
          <span><span class="meta-label">Target:</span> <span class="meta-value">${exercise.target}</span></span>
        </div>
      </div>
    `;
  }

  // Render the complete exercises list
  render(exercises) {
    if (!this.container) {
      console.error('Container not provided for ExercisesList');
      return;
    }

    if (!exercises || exercises.length === 0) {
      this.container.innerHTML = this.getEmptyMessage();
      return;
    }

    const exercisesHtml = exercises.map(exercise => this.generateExerciseCard(exercise)).join('');

    // For main page, wrap in exercises-list div
    if (!this.showRemoveBtn) {
      this.container.innerHTML = `<div class="exercises-list">${exercisesHtml}</div>`;
    } else {
      // For favorites, render directly
      this.container.innerHTML = exercisesHtml;
    }

    this.attachEventListeners();
  }

  // Get empty state message
  getEmptyMessage() {
    if (this.showRemoveBtn) {
      return `<p class="no-favorites-msg">
        It appears that you haven't added any exercises to your favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.
      </p>`;
    }
    return '<div class="error">No exercises found.</div>';
  }

  // Attach event listeners to rendered elements
  attachEventListeners() {
    // Start button clicks
    const startBtns = this.container.querySelectorAll('.start-btn');
    console.log('Found start buttons:', startBtns.length); // Debug log

    startBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling
        const exerciseId = btn.dataset.exerciseId;
        console.log('Start button clicked, exercise ID:', exerciseId); // Debug log
        this.onStartClick(exerciseId);
      });
    });

    // Remove button clicks (for favorites)
    if (this.showRemoveBtn) {
      const removeBtns = this.container.querySelectorAll('.remove-btn');
      removeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation(); // Prevent event bubbling
          const exerciseId = btn.dataset.id;
          this.onRemoveClick(exerciseId);
        });
      });
    }
  }

  // Update a single exercise (useful for favorites)
  removeExercise(exerciseId) {
    const exerciseElement = this.container.querySelector(`[data-exercise-id="${exerciseId}"]`);
    if (exerciseElement) {
      exerciseElement.remove();

      // Check if list is now empty
      const remainingExercises = this.container.querySelectorAll('.exercise-item');
      if (remainingExercises.length === 0) {
        this.container.innerHTML = this.getEmptyMessage();
      }
    }
  }

  // Clear the list
  clear() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

// Helper function to create pagination HTML
export function createPaginationHTML(currentPage, totalPages) {
  if (totalPages <= 1) return '';

  const pages = [];

  // Previous button
  pages.push(`
    <button class="page-btn nav-btn prev" ${currentPage === 1 ? 'disabled' : ''} data-page="prev">
      <svg width="20" height="20">
        <use href="./img/icons.svg#icon-nav-arrow"></use>
      </svg>
    </button>
  `);

  // Page numbers
  pages.push(generatePageNumbers(currentPage, totalPages));

  // Next button
  pages.push(`
    <button class="page-btn nav-btn next" ${currentPage === totalPages ? 'disabled' : ''} data-page="next">
      <svg width="20" height="20">
        <use href="./img/icons.svg#icon-nav-arrow"></use>
      </svg>
    </button>
  `);

  return `<div class="muscles-pagination">${pages.join('')}</div>`;
}

function generatePageNumbers(current, total) {
  const pages = [];

  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      pages.push(`<button class="page-btn ${i === current ? 'active' : ''}" data-page="${i}">${i}</button>`);
    }
  } else {
    pages.push(`<button class="page-btn ${1 === current ? 'active' : ''}" data-page="1">1</button>`);

    if (current > 3) {
      pages.push('<span class="page-dots">...</span>');
    }

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== total) {
        pages.push(`<button class="page-btn ${i === current ? 'active' : ''}" data-page="${i}">${i}</button>`);
      }
    }

    if (current < total - 2) {
      pages.push('<span class="page-dots">...</span>');
    }

    if (total > 1) {
      pages.push(`<button class="page-btn ${total === current ? 'active' : ''}" data-page="${total}">${total}</button>`);
    }
  }

  return pages.join('');
}