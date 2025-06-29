import { get } from './api';
import Modal from './modal';
import { ExercisesList, createPaginationHTML } from './exercises-list';

// ===============================================
// CONSTANTS & CONFIGURATION
// ===============================================
const CONFIG = {
  FILTERS_PER_PAGE: 12,
  EXERCISES_PER_PAGE: 10,
  SEARCH_DEBOUNCE_DELAY: 1000,
  ANIMATION_DURATION: 0,
  DEFAULT_FILTER: 'Muscles',
};

const SELECTORS = {
  musclesGrid: '#muscles-grid',
  tabs: '.tab',
  searchSection: '#search-section',
  breadcrumb: '#breadcrumb',
  searchInput: '.search-input',
  searchClearBtn: '#search-clear-btn',
};

const FILTER_TYPES = {
  MUSCLES: 'Muscles',
  BODY_PARTS: 'Body parts',
  EQUIPMENT: 'Equipment',
};

// ===============================================
// STATE MANAGEMENT
// ===============================================
class ExercisesState {
  constructor() {
    this.currentPage = 1;
    this.totalPages = 1;
    this.currentFilter = CONFIG.DEFAULT_FILTER;
    this.selectedBodyPart = '';
    this.allExercises = [];
    this.filteredExercises = [];
    this.exercisesMap = new Map();
    this.currentHeight = 0;
    this.searchTimeout = null;
  }

  reset() {
    this.currentPage = 1;
    this.totalPages = 1;
    this.allExercises = [];
    this.filteredExercises = [];
    this.exercisesMap.clear();
    this.selectedBodyPart = '';
    this.clearSearchTimeout();
  }

  clearSearchTimeout() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = null;
    }
  }
}

// ===============================================
// DOM UTILITIES
// ===============================================
class DOMUtils {
  static getElementById(id) {
    return document.getElementById(id.replace('#', ''));
  }

  static querySelectorAll(selector) {
    return document.querySelectorAll(selector);
  }

  static show(element) {
    element.style.display = 'block';
  }

  static hide(element) {
    element.style.display = 'none';
  }

  static setContent(element, content) {
    element.innerHTML = content;
  }

  static measureContentHeight(content, containerWidth) {
    const tempContainer = document.createElement('div');
    Object.assign(tempContainer.style, {
      visibility: 'hidden',
      position: 'absolute',
      top: '-9999px',
      width: `${containerWidth}px`,
    });
    tempContainer.innerHTML = content;
    document.body.appendChild(tempContainer);

    const height = tempContainer.scrollHeight;
    document.body.removeChild(tempContainer);
    return height;
  }

  static animateHeight(element, newHeight, duration = CONFIG.ANIMATION_DURATION) {
    element.style.height = `${newHeight}px`;
    setTimeout(() => {
      element.style.height = 'auto';
    }, duration);
  }
}

// ===============================================
// API UTILITIES
// ===============================================
class APIService {
  static async fetchFilters(filter, page = 1) {
    return await get('filters', {
      filter,
      page,
      limit: CONFIG.FILTERS_PER_PAGE
    });
  }

  static async fetchExercises(filterName, filterType, page = 1) {
    const params = {
      page,
      limit: CONFIG.EXERCISES_PER_PAGE
    };

    switch (filterType) {
      case FILTER_TYPES.BODY_PARTS:
        params.bodypart = filterName;
        break;
      case FILTER_TYPES.MUSCLES:
        params.muscles = filterName;
        break;
      case FILTER_TYPES.EQUIPMENT:
        params.equipment = filterName;
        break;
    }

    return await get('exercises', params);
  }
}

// ===============================================
// TEMPLATE GENERATORS
// ===============================================
class Templates {
  static filterCard(item) {
    return `
      <div class="muscle-card" data-filter="${item.name}" data-filter-type="${item.filter}">
        <img src="${item.imgURL}" alt="${item.name}" class="muscle-card-img" />
        <div class="muscle-card-label">
          <span class="muscle-card-title">${item.name}</span>
          <span class="muscle-card-subtitle">${item.filter}</span>
        </div>
      </div>
    `;
  }

  static loadingTemplate(height) {
    return `<div class="loading" style="height: ${height - 80}px;">Loading...</div>`;
  }

  static errorTemplate(message) {
    return `<div class="error">${message}</div>`;
  }

  static contentWrapper(content, paginationHTML = '') {
    return `
      <div class="content-wrapper">
        <div class="content-area">${content}</div>
        ${paginationHTML ? `<div class="pagination-area">${paginationHTML}</div>` : ''}
      </div>
    `;
  }
}

// ===============================================
// MAIN EXERCISES CLASS
// ===============================================
class ExercisesManager {
  constructor() {
    this.state = new ExercisesState();
    this.elements = this.initializeElements();
    this.modal = new Modal();
    this.exercisesList = null;

    // Don't continue if essential elements are missing
    if (!this.elements) {
      return;
    }

    this.setupEventListeners();
  }

  initializeElements() {
    const elements = {
      musclesGrid: DOMUtils.getElementById(SELECTORS.musclesGrid),
      tabs: DOMUtils.querySelectorAll(SELECTORS.tabs),
      searchSection: DOMUtils.getElementById(SELECTORS.searchSection),
      breadcrumb: DOMUtils.getElementById(SELECTORS.breadcrumb),
      searchClearBtn: DOMUtils.getElementById(SELECTORS.searchClearBtn),
    };

    // Check if essential elements exist
    if (!elements.musclesGrid || !elements.searchSection) {
      return null;
    }

    // Add searchInput safely
    elements.searchInput = elements.searchSection.querySelector(SELECTORS.searchInput);

    return elements;
  }

  setupEventListeners() {
    this.setupTabListeners();
    this.setupSearchListeners();
    this.setupExerciseClickListeners();
  }

  setupTabListeners() {
    this.elements.tabs.forEach(tab => {
      tab.addEventListener('click', () => this.handleTabSwitch(tab));
    });
  }

  setupSearchListeners() {
    this.elements.searchInput.addEventListener('input', (e) => this.handleSearchInput(e));
    this.elements.searchInput.addEventListener('keydown', (e) => this.handleSearchKeydown(e));
    this.elements.searchClearBtn.addEventListener('click', (e) => this.handleSearchClear(e));
  }

  setupExerciseClickListeners() {
    this.elements.musclesGrid.addEventListener('click', (e) => {
      const filterCard = e.target.closest('.muscle-card');
      if (filterCard) {
        const filterName = filterCard.dataset.filter;
        const filterType = filterCard.dataset.filterType;
        this.renderExercisesList(filterName, filterType, '', 1);
        return;
      }

      const backBtn = e.target.closest('.back-btn');
      if (backBtn) {
        this.state.reset();
        this.clearSearchInput();
        this.renderFilters(this.state.currentFilter, 1);
        return;
      }

      const pageBtn = e.target.closest('.page-btn');
      if (pageBtn) {
        this.handlePagination(pageBtn, this.state.selectedBodyPart ? 'exercises' : 'filters');
        return;
      }
    });
  }

  // ===============================================
  // RENDERING METHODS
  // ===============================================
  async renderFilters(filter = CONFIG.DEFAULT_FILTER, page = 1) {
    this.hideSearchAndBreadcrumb();
    this.state.selectedBodyPart = '';

    this.prepareContainer();

    try {
      const data = await APIService.fetchFilters(filter, page);
      this.updateFilterState(data, filter);

      if (!data.results.length) {
        this.showError('No items found.');
        return;
      }

      const content = this.buildFiltersContent(data.results);
      const paginationHTML = createPaginationHTML(page, this.state.totalPages);
      const fullContent = Templates.contentWrapper(content, paginationHTML);

      this.updateContainerWithAnimation(fullContent);

    } catch (error) {
      this.showError('Failed to load data.');
    }
  }

  async renderExercisesList(filterName, filterType, searchTerm = '', page = 1) {
    this.showSearchAndBreadcrumb(filterName);

    if (!searchTerm) {
      this.clearSearchInput();
    }

    this.prepareContainer();

    try {
      const data = await APIService.fetchExercises(filterName, filterType, page);
      this.updateExercisesState(data, filterName);

      const filteredExercises = this.filterExercises(searchTerm);

      if (filteredExercises.length === 0) {
        this.showNoExercisesFound(searchTerm);
        return;
      }

      // Build complete content with back button first
      const backButton = `<button class="back-btn"><span class="arrow">←</span> Back to ${this.state.currentFilter}</button>`;
      const paginationHTML = searchTerm ? '' : createPaginationHTML(page, this.state.totalPages);

      // Create the wrapper structure
      const fullContent = `
        <div class="content-wrapper">
          <div class="content-area">
            <div class="exercises-list-container"></div>
            ${backButton}
          </div>
          ${paginationHTML ? `<div class="pagination-area">${paginationHTML}</div>` : ''}
        </div>
      `;

      // Update container with the structure
      this.updateContainerWithAnimation(fullContent);

      // Now find the exercises list container and initialize the component
      const exercisesListContainer = this.elements.musclesGrid.querySelector('.exercises-list-container');

      // Initialize ExercisesList component with the actual DOM element
      this.exercisesList = new ExercisesList({
        container: exercisesListContainer,
        showRating: true,
        showRemoveBtn: false,
        onStartClick: (exerciseId) => {
          console.log('onStartClick called with ID:', exerciseId);
          const exercise = this.state.exercisesMap.get(exerciseId);
          console.log('Exercise found:', exercise);
          if (exercise) {
            this.modal.showModal(exercise);
          } else {
            console.error('Exercise not found in exercisesMap for ID:', exerciseId);
          }
        }
      });

      // Render exercises - this will also attach event listeners
      this.exercisesList.render(filteredExercises);

    } catch (error) {
      this.showError('Failed to load exercises.');
    }
  }

  // ===============================================
  // CONTENT BUILDING METHODS
  // ===============================================
  buildFiltersContent(results) {
    const cardsHTML = results.map(item => Templates.filterCard(item)).join('');
    return `<div class="muscles-cards-wrapper">${cardsHTML}</div>`;
  }

  // ===============================================
  // STATE UPDATE METHODS
  // ===============================================
  updateFilterState(data, filter) {
    this.state.totalPages = data.totalPages;
    this.state.currentFilter = filter;
  }

  updateExercisesState(data, filterName) {
    this.state.allExercises = data.results || [];
    this.state.totalPages = data.totalPages || 1;
    this.state.selectedBodyPart = filterName;

    this.state.exercisesMap.clear();
    this.state.allExercises.forEach(exercise => {
      this.state.exercisesMap.set(exercise._id, exercise);
    });
  }

  filterExercises(searchTerm) {
    if (searchTerm) {
      this.state.filteredExercises = this.state.allExercises.filter(exercise =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.state.filteredExercises = [...this.state.allExercises];
    }
    return this.state.filteredExercises;
  }

  // ===============================================
  // UI UPDATE METHODS
  // ===============================================
  hideSearchAndBreadcrumb() {
    DOMUtils.hide(this.elements.searchSection);
    DOMUtils.hide(this.elements.breadcrumb);
  }

  showSearchAndBreadcrumb(filterName) {
    DOMUtils.show(this.elements.searchSection);
    DOMUtils.show(this.elements.breadcrumb);
    this.elements.breadcrumb.textContent = `/ ${filterName.charAt(0).toUpperCase() + filterName.slice(1)}`;
  }

  prepareContainer() {
    if (this.state.currentHeight === 0) {
      this.state.currentHeight = this.elements.musclesGrid.getBoundingClientRect().height || 600;
    }

    this.elements.musclesGrid.style.height = `${this.state.currentHeight}px`;
    DOMUtils.setContent(this.elements.musclesGrid, Templates.loadingTemplate(this.state.currentHeight));
  }

  updateContainerWithAnimation(content) {
    const newHeight = DOMUtils.measureContentHeight(content, this.elements.musclesGrid.offsetWidth);

    DOMUtils.setContent(this.elements.musclesGrid, content);
    DOMUtils.animateHeight(this.elements.musclesGrid, newHeight);
    this.state.currentHeight = newHeight;
  }

  showError(message) {
    DOMUtils.setContent(this.elements.musclesGrid, Templates.errorTemplate(message));
  }

  showNoExercisesFound(searchTerm) {
    const message = `No exercises found${searchTerm ? ` matching "${searchTerm}"` : ''}.`;
    const backButton = `<button class="back-btn"><span class="arrow">←</span> Back to ${this.state.currentFilter}</button>`;
    DOMUtils.setContent(this.elements.musclesGrid, Templates.errorTemplate(message) + backButton);
  }

  // ===============================================
  // EVENT HANDLERS
  // ===============================================
  handleTabSwitch(tab) {
    this.elements.tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    this.state.reset();
    this.clearSearchInput();

    const filterMap = {
      'muscles': FILTER_TYPES.MUSCLES,
      'body-parts': FILTER_TYPES.BODY_PARTS,
      'equipment': FILTER_TYPES.EQUIPMENT,
    };

    const filter = filterMap[tab.dataset.tab] || CONFIG.DEFAULT_FILTER;
    this.renderFilters(filter, 1);
  }

  handleSearchInput(e) {
    const searchTerm = e.target.value.trim();
    this.updateSearchClearButton();

    this.state.clearSearchTimeout();
    this.state.searchTimeout = setTimeout(() => {
      this.performSearch(searchTerm);
    }, CONFIG.SEARCH_DEBOUNCE_DELAY);
  }

  handleSearchKeydown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.state.clearSearchTimeout();
      this.performSearch(e.target.value.trim());
    }
  }

  handleSearchClear(e) {
    e.preventDefault();
    this.clearSearch();
  }

  // ===============================================
  // SEARCH METHODS
  // ===============================================
  performSearch(searchTerm) {
    if (this.state.selectedBodyPart) {
      this.renderExercisesList(this.state.selectedBodyPart, this.state.currentFilter, searchTerm, 1);
    }
  }

  clearSearch() {
    this.elements.searchInput.value = '';
    this.updateSearchClearButton();
    this.state.clearSearchTimeout();

    if (this.state.selectedBodyPart) {
      this.performSearch('');
    }
  }

  clearSearchInput() {
    this.elements.searchInput.value = '';
    this.updateSearchClearButton();
  }

  updateSearchClearButton() {
    const hasValue = this.elements.searchInput.value.trim().length > 0;
    this.elements.searchClearBtn.style.display = hasValue ? 'flex' : 'none';
  }

  handlePagination(btn, type) {
    const { page } = btn.dataset;
    let newPage = this.state.currentPage;

    if (page === 'prev' && this.state.currentPage > 1) {
      newPage = this.state.currentPage - 1;
    } else if (page === 'next' && this.state.currentPage < this.state.totalPages) {
      newPage = this.state.currentPage + 1;
    } else if (page && !isNaN(page)) {
      newPage = parseInt(page);
    }

    if (newPage !== this.state.currentPage) {
      this.state.currentPage = newPage;

      if (type === 'filters') {
        this.renderFilters(this.state.currentFilter, newPage);
      } else {
        this.renderExercisesList(this.state.selectedBodyPart, this.state.currentFilter, '', newPage);
      }
    }
  }

  // ===============================================
  // INITIALIZATION
  // ===============================================
  init() {
    // Don't initialize if elements weren't properly set up
    if (!this.elements) {
      return;
    }
    this.renderFilters(CONFIG.DEFAULT_FILTER, 1);
  }
}

// ===============================================
// APPLICATION STARTUP
// ===============================================
function initExercisesApp() {
  const exercisesManager = new ExercisesManager();
  exercisesManager.init();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initExercisesApp);
} else {
  // DOM is already loaded
  initExercisesApp();
}