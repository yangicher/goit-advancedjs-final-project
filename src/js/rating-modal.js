import { patch } from './api';

export default class RatingModal {
  constructor(rootSelector = '#modal-root') {
    this.#rootSelector = rootSelector;
  }

  #rootSelector;
  #exerciseId = '';
  #isShown = false;
  #selectedRating = 0;
  #email = '';
  #comment = '';

  get #rootElement() {
    return document.querySelector(this.#rootSelector);
  }

  get #backDrop() {
    return this.#rootElement?.querySelector('.modal-backdrop');
  }

  get #closeButton() {
    return this.#rootElement?.querySelector('#menu-close-button');
  }

  get #stars() {
    return this.#rootElement?.querySelectorAll('.star-rating svg');
  }

  get #ratingCountInfo() {
    return this.#rootElement?.querySelector('.modal-rating-count');
  }

  get #sendButton() {
    return this.#rootElement?.querySelector('#send-rating-button');
  }

  get #form() {
    return this.#rootElement?.querySelector('#rating-form');
  }

  get #emailInput() {
    return this.#rootElement?.querySelector('#email');
  }

  get #commentInput() {
    return this.#rootElement?.querySelector('#comment');
  }

  #reset() {
    this.#exerciseId = '';
    this.#selectedRating = 0;
    this.#email = '';
    this.#comment = '';
    this.#isShown = false;

    if (this.#form) this.#form.reset?.();
    if (this.#ratingCountInfo) this.#ratingCountInfo.textContent = '0.0';
    if (this.#sendButton) this.#sendButton.setAttribute('disabled', 'true');
  }

  #renderModal() {
    return `
      <div class="modal-backdrop">
        <div class="modal-rating-container">
          <svg id="menu-close-button" class="menu-close-button">
            <use href="./img/icons.svg#menu-close"></use>
          </svg>
          <p class="modal-rating-header">Rating</p>
          <div class="modal-rating-info-container">
            <div class="modal-rating-stars-container">
              <p class="modal-rating-count">0.0</p>
              <ul class="star-rating">
                ${[1, 2, 3, 4, 5]
                  .map(
                    i => `
                  <li><svg data-index="${i}"><use href="./img/icons.svg#icon-star"></use></svg></li>
                `
                  )
                  .join('')}
              </ul>
            </div>
            <form id="rating-form">
              <label>
                <input required type="email" name="email" id="email" placeholder="Email" autocomplete="email" pattern="^\w+(.\w+)?@[a-zA-Z_]+?.[a-zA-Z]{2,3}$)" />
              </label>
              <label>
                <textarea required name="comment" id="comment" placeholder="Your comment" rows="4"></textarea>
              </label>
              <div class="modal-controls">
                <button type="submit" id="send-rating-button" class="btn primary" disabled>Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>`;
  }

  #dispatchCloseEvent() {
    this.#rootElement?.dispatchEvent(
      new CustomEvent('rating-modal:close', { bubbles: true })
    );
  }

  #hideModalHandler = e => {
    if (e.target.classList.contains('modal-backdrop')) {
      this.hideModal();
    }
  };

  #highlightStars = count => {
    this.#stars?.forEach((star, i) => {
      star.classList.toggle('hovered', i < count);
      star.classList.toggle('selected', i < this.#selectedRating);
    });
  };

  #toggleButtonDisable() {
    if (!this.#sendButton) return;

    const ready =
      this.#email.trim() && this.#comment.trim() && this.#selectedRating > 0;
    this.#sendButton.disabled = !ready;
  }

  #submit = async e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email')?.trim();
    const comment = formData.get('comment')?.trim();

    try {
      await patch(`exercises/${this.#exerciseId}/rating`, {
        rate: this.#selectedRating,
        email,
        review: comment,
      });

      this.hideModal();
    } catch (err) {
      console.error('Rating submit failed:', err);
      alert('Failed to submit rating. Please try again later.');
    }
  };

  #initStarsListeners() {
    this.#stars?.forEach((star, index) => {
      star.addEventListener('mouseover', () => this.#highlightStars(index + 1));
      star.addEventListener('mouseout', () =>
        this.#highlightStars(this.#selectedRating)
      );
      star.addEventListener('click', () => {
        this.#selectedRating = index + 1;
        this.#highlightStars(this.#selectedRating);
        if (this.#ratingCountInfo) {
          this.#ratingCountInfo.textContent = this.#selectedRating.toFixed(1);
        }
        this.#toggleButtonDisable();
      });
    });
  }

  #onEscapeKeydown = e => {
    if (e.key === 'Escape') {
      this.hideModal();
    }
  };

  showModal(id) {
    if (!id) return;

    this.#exerciseId = id;
    this.#rootElement.innerHTML = this.#renderModal();

    this.#backDrop?.addEventListener('click', this.#hideModalHandler);
    this.#closeButton?.addEventListener('click', this.hideModal);
    this.#form?.addEventListener('submit', this.#submit);

    this.#emailInput?.addEventListener('input', e => {
      this.#email = e.target.value;
      this.#toggleButtonDisable();
    });

    this.#commentInput?.addEventListener('input', e => {
      this.#comment = e.target.value;
      this.#toggleButtonDisable();
    });
    window.addEventListener('keydown', this.#onEscapeKeydown);
    document.body.style.overflow = 'hidden';

    this.#isShown = true;
    this.#initStarsListeners();
  }

  hideModal = () => {
    if (!this.#isShown) return;

    window.removeEventListener('keydown', this.#onEscapeKeydown);
    document.body.style.overflow = 'visible';
    this.#rootElement.innerHTML = '';
    this.#dispatchCloseEvent();
    this.#reset();
  };
}
