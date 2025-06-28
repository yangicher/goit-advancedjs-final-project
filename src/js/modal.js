import { getFavorites } from './helpers';
import RatingModal from './rating-modal';

export default class Modal {
  constructor(rootSelector = '#modal-root') {
    this.#rootSelector = rootSelector;
    this.#ratingModal = new RatingModal(this.#rootSelector);

    this.#rootElement.addEventListener(
      'rating-modal:close',
      this.#closeRatingModalHandler
    );
  }
  #rootSelector;
  #isShown = false;
  #currentData = {};
  #ratingModal = null;

  get #rootElement() {
    return document.querySelector(this.#rootSelector);
  }

  get #backDrop() {
    return document.querySelector('.modal-backdrop');
  }

  get #addToFavoriteButton() {
    return document.querySelector('#add-to-favorite-button');
  }

  get #giveRatingButton() {
    return document.querySelector('#give-a-rating-button');
  }

  get #closeButton() {
    return document.querySelector('#menu-close-button');
  }

  #renderModal(data) {
    this.#currentData = data;

    const {
      target,
      bodyPart,
      equipment,
      gifUrl,
      name,
      description,
      rating,
      burnedCalories,
      time,
      popularity,
    } = this.#currentData;
    return `<div class="modal-backdrop">
      <div class="modal-container">
        <svg id="menu-close-button" class="menu-close-button">
          <use href="./img/icons.svg#menu-close"></use>
        </svg>
        <div class="info-container">
          <img src="${gifUrl}" alt="exercise" class="modal-image" />
          <div>
            <p class="modal-name">${name}</p>
            <div class="modal-rating-info">
              <p class="modal-rating">${rating}</p>
              ${this.#generateRatingStars(rating)}
            </div>
            <hr />
            <ul class="modal-meta">
              <li>
                <p>Target</p>
                <p>${target}</p>
              </li>
              <li>
                <p>Body Part</p>
                <p>${bodyPart}</p>
              </li>
              <li>
                <p>Equipment</p>
                <p>${equipment}</p>
              </li>
              <li>
                <p>Popular</p>
                <p>${popularity}</p>
              </li>
              <li>
                <p>Burned Calories</p>
                <p>${burnedCalories} / ${time} min</p>
              </li>
            </ul>
            <hr />
            <p class="modal-description">${description}</p>
          </div>
        </div>
        <div class="modal-controls">
          <button id="add-to-favorite-button" class="btn primary">
            Add to favorites
          </button>
          <button id="give-a-rating-button" class="btn secondary">
            Give rating
          </button>
        </div>
      </div>
    </div>`;
  }

  #hideModalHandler = e => {
    if (e.target.classList.contains('modal-backdrop')) {
      this.hideModal();
    }
  };

  #toggleFavorite = () => {
    const favorites = getFavorites();
    const name = this.#currentData.name;

    const index = favorites.findIndex(item => item.name === name);
    if (index !== -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(this.#currentData);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.#updateFavoriteButtonText();
  };

  #updateFavoriteButtonText = () => {
    const btn = this.#addToFavoriteButton;
    if (!btn) return;

    const isFavorite = getFavorites().some(
      item => item.name === this.#currentData.name
    );

    btn.innerHTML = isFavorite
      ? 'Remove from favorites <svg><use href="./img/icons.svg#icon-trash"></use></svg>'
      : 'Add to favorites <svg><use href="./img/icons.svg#icon-heart"></use></svg>';
  };

  #generateRatingStars(rating) {
    const full = Math.floor(rating);
    const empty = 5 - full;
    return `
    <ul class="modal-rating-stars">
      ${'<li><svg class="active"><use href="./img/icons.svg#icon-star"></use></svg></li>'.repeat(
        full
      )}
      ${'<li><svg><use href="./img/icons.svg#icon-star"></use></svg></li>'.repeat(
        empty
      )}
    </ul>
  `;
  }

  #showRatingModalHandler = () => {
    this.hideModal();
    this.#ratingModal.showModal(this.#currentData._id);
  };

  #closeRatingModalHandler = () => {
    this.showModal(this.#currentData);
  };

  #onEscapeKeydown = e => {
    if (e.key === 'Escape') {
      this.hideModal();
    }
  };

  showModal = props => {
    if (this.#isShown) return;

    this.#rootElement.innerHTML = this.#renderModal(props);

    this.#addToFavoriteButton?.addEventListener('click', this.#toggleFavorite);
    this.#backDrop?.addEventListener('click', this.#hideModalHandler);
    this.#closeButton?.addEventListener('click', this.hideModal);
    this.#giveRatingButton?.addEventListener(
      'click',
      this.#showRatingModalHandler
    );

    window.addEventListener('keydown', this.#onEscapeKeydown);

    this.#updateFavoriteButtonText();
    this.#isShown = true;
  };

  hideModal = () => {
    if (!this.#isShown) return;
    
    window.removeEventListener('keydown', this.#onEscapeKeydown);
    this.#rootElement.innerHTML = '';
    this.#isShown = false;
  };
}
