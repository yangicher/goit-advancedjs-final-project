import { get } from './api';

let currentMode = '';
let quoteData = null;

window.addEventListener('DOMContentLoaded', async () => {
  try {
    quoteData = await getQuoteData();
    renderQuote();
  } catch (error) {
    console.error('Помилка ініціалізації:', error);
  }
});

window.addEventListener('resize', () => {
  const newMode = window.innerWidth >= 1440 ? 'desktop' : 'mobile';
  if (newMode !== currentMode) {
    renderQuote();
  }
});

async function getQuoteData() {
  const stored = localStorage.getItem('quoteData');
  const today = new Date().toISOString().slice(0, 10);

  if (stored) {
    const data = JSON.parse(stored);
    if (data.date === today) return data;
  }

  const data = await get('quote');

  const freshData = {
    date: today,
    author: data.author,
    quote: data.quote,
  };

  localStorage.setItem('quoteData', JSON.stringify(freshData));
  return freshData;
}

function renderQuote() {
  const isDesktop = window.innerWidth >= 1440;
  currentMode = isDesktop ? 'desktop' : 'mobile';

  const existing = document.querySelector('.js-quote-container');
  if (existing) existing.remove();

  const wrapper = document.createElement('div');
  wrapper.className = 'js-quote-container';
  wrapper.innerHTML = generateQuoteTemplate(quoteData);

  const sidebar = document.querySelector('.exercises-sidebar');
  const exercisesPage = document.querySelector('.exercises-page');

  if (isDesktop && sidebar) {
    sidebar.innerHTML = '';
    sidebar.appendChild(wrapper);
  } else if (exercisesPage) {
    wrapper.classList.add('container');
    exercisesPage.insertAdjacentElement('afterend', wrapper);
  }
}

function generateQuoteTemplate(data) {
  return `
<div class="quote">
  <div class="quote-cards-wrapper">
    <div class="quote-card">
      <div class="qoute-wrap">
        <div class="icon-wrap">
          <svg class="quote-icon-run" width="20" height="20">
            <use href="../img/icons.svg#icon-run"></use>
          </svg>
        </div>
        <div class="quote-day-wrap">
          <div class="quote-title">
            <p class="quote-day-title">Quote of the day</p>
            <svg width="20" height="20">
              <use href="../img/icons.svg#icon-quote"></use>
            </svg>
          </div>
          <p class="quote-day js-quote">${data.quote}</p>
          <p class="qoute-author js-author">${data.author}</p>
        </div>
      </div>
    </div>
    <div class="quote-img-wrap">
      <picture>
        <source media="(min-width: 1440px)" srcset="
            ../img/quote/quote-home-desk.webp,
            ../img/quote/quote-home-desk@2x.webp 2x,
            ../img/quote/quote-home-desk@3x.webp 3x
          " />
        <source media="(min-width: 768px)" srcset="
            ../img/quote/quote-home-tab.webp,
            ../img/quote/quote-home-tab@2x.webp 2x,
            ../img/quote/quote-home-tab@3x.webp 3x
          " />
        <img
          class="quote-img"
          src="../img/quote/quote-home-mob@1x.webp"
          srcset="
            ../img/quote/quote-home-mob@2x.webp 2x,
            ../img/quote/quote-home-mob@3x.webp 3x
          "
          alt="quote image"
        />
      </picture>
    </div>
    <div class="quote-news">
      <div class="news-title-wrap">
        <svg class="icon-news" width="32" height="32">
          <use href="../img/icons.svg#icon-dailynorm"></use>
        </svg>
        <div class="news-title">
          <p class="news-title-time">110 min</p>
          <p class="news-title-norm">Daily norm of sports</p>
          <p class="news-recommends">
            The World Health Organization recommends at least 150 minutes of
            moderate-intensity aerobic physical activity throughout the week for
            adults aged 18-64. However, what happens if we adjust that number to
            110 minutes every day? While it might seem like a high number to
            hit, dedicating 110 minutes daily to sporting activities may offer
            unparalleled benefits to physical health, mental well-being, and
            overall quality of life.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
`;
}
