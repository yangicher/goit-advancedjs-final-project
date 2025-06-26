import '../css/submit-modal.css';

export default class RatingModal {
  constructor(rootSelector = '#modal-root') {
    this.rootSelector = rootSelector;
    this.isShown = false;
    this.currentData = {};
    this.onClose = null;
  }

  get rootElement() {
    return document.querySelector(this.rootSelector);
  }

  render() {
    return `
        <div class="modal-backdrop">
          <div class="modal-container secondary-backdrop">
            <svg id="rating-close-button" class="menu-close-button">
              <use href="./img/icons.svg#menu-close"></use>
            </svg>
            <form id="rating-form" class="rating-form">
              <label>Rating</label>
              <div class="stars-rating">
              <span class="star-score" id="star-score">0.0</span>
                <div class="stars-list" id="stars-list">
                  ${[1, 2, 3, 4, 5]
                  .map(
                    i => `
                      <button type="button" class="star-button" data-value="${i}">
                        <svg class="star-icon">
                          <use href="./img/icons.svg#icon-star"></use>
                        </svg>
                      </button>`
                  )
                  .join('')}
                </div>
              </div>
              <input type="email" name="email" placeholder="Email" required pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$" />
              <textarea name="comment" placeholder="Your comment" required></textarea>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>`;
  }

  show(data, onClose = null) {
    if (this.isShown) return;
    this.currentData = data;
    this.onClose = onClose;
    this.rootElement.innerHTML = this.render(); 
    this.isShown = true;
  
    const starButtons = document.querySelectorAll('.star-button');
    const scoreDisplay = document.getElementById('star-score');
    let selectedRating = 0;
  
    document.querySelector('#rating-close-button')?.addEventListener('click', () => this.hide());
    document.querySelector('.modal-backdrop')?.addEventListener('click', e => {
      if (e.target.classList.contains('modal-backdrop')) this.hide();
    });
  
    document.querySelector('#rating-form')?.addEventListener('submit', async e => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value.trim();
      const comment = form.comment.value.trim();
      const exerciseId = this.currentData._id; 
    
      if (!selectedRating || !email || !comment) {
        alert('Please fill out all fields correctly.');
        return;
      }
    
      try {
        const response = await fetch(`https://your-energy.b.goit.study/api/exercises/${exerciseId}/rating`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            rate: selectedRating,
            email,
            review: comment,
          }),          
        });
    
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Something went wrong');
        }
    
        alert('Thank you! Your rating has been submitted.');
        this.hide();
        if (typeof this.onClose === 'function') this.onClose(); 
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    });
    
  
    starButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        selectedRating = parseInt(btn.dataset.value, 10);
  
        starButtons.forEach(b => {
          const star = b.querySelector('use');
          const value = parseInt(b.dataset.value, 10);
          star.setAttribute(
            'href',
            value <= selectedRating
              ? './img/icons.svg#icon-star-full'
              : './img/icons.svg#icon-star'
          );
        });
  
        scoreDisplay.textContent = `${selectedRating.toFixed(1)}`;
      });
    });
  }
  
  hide() {
    if (!this.isShown) return;
    this.rootElement.innerHTML = '';
    this.isShown = false;
  }
}
