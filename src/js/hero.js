export function renderHero() {
    const heroContainer = document.getElementById('heroContainer');
    if (!heroContainer) return;
  
    heroContainer.innerHTML = '';
  
    // === TOP SECTION ===
    const topSection = document.createElement('div');
    topSection.className = 'hero-top';
  
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'hero-content';
  
    const iconTitle = document.createElement('div');
    iconTitle.className = 'hero-icon-title';
  
    const title = document.createElement('h1');
    title.className = 'hero-title';
    title.innerHTML = `
      <svg class="hero-icon" width="38" height="38">
        <use href="./img/icons.svg#icon-sun"></use>
      </svg>
      Get <span class="italic">Body</span> in<br /> shape, Stay healthy
    `;
    iconTitle.appendChild(title);
    contentWrapper.appendChild(iconTitle);
  
    const subtitle = document.createElement('p');
    subtitle.className = 'hero-subtitle';
    subtitle.textContent =
      'Transform your physique and embrace a healthier lifestyle with our comprehensive fitness and nutrition support.';
    contentWrapper.appendChild(subtitle);
  
    const sideWrapper = document.createElement('div');
    sideWrapper.className = 'hero-side';
  
    const picture = document.createElement('picture');
    picture.innerHTML = `
      <source srcset="./img/hero/hero-side@1x.webp 1x, ./img/hero/hero-side@2x.webp 2x" type="image/webp">
      <img src="./img/hero/hero-side@1x.webp" alt="Athletic person in motion" class="hero-side-image" />
    `;
    sideWrapper.appendChild(picture);
  
    topSection.appendChild(contentWrapper);
    topSection.appendChild(sideWrapper);
    heroContainer.appendChild(topSection);
  
    // === MAIN IMAGE ===
    const bottomSection = document.createElement('div');
    bottomSection.className = 'hero-bottom-image';
  
    const bottomPicture = document.createElement('picture');
    bottomPicture.innerHTML = `
      <source srcset="./img/hero/hero-1440@1x.webp 1x, ./img/hero/hero-1440@2x.webp 2x" media="(min-width: 1440px)" type="image/webp">
      <source srcset="./img/hero/hero-768@1x.webp 1x, ./img/hero/hero-768@2x.webp 2x" media="(min-width: 768px)" type="image/webp">
      <source srcset="./img/hero/hero-375@1x.webp 1x, ./img/hero/hero-375@2x.webp 2x" type="image/webp">
      <img 
        src="./img/hero/hero-375@1x.webp"
        srcset="./img/hero/hero-375@2x.webp 2x"
        alt="Solar panels on a rooftop"
        class="hero-image"
      />
    `;
    bottomSection.appendChild(bottomPicture);
    heroContainer.appendChild(bottomSection);
  
    // === TAGS ===
    const tagsRow1 = ['Sport', 'Healthy'];
    const tagsRow2 = ['Workout', 'Diet'];
  
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'hero-tags';
  
    const createTagRow = tags => {
      const row = document.createElement('div');
      row.className = 'hero-tags-row';
      tags.forEach(tag => {
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = `#${tag}`;
        row.appendChild(a);
      });
      return row;
    };
  
    const renderTags = () => {
      tagsContainer.innerHTML = '';
      if (window.innerWidth >= 1440) {
        tagsContainer.appendChild(createTagRow(tagsRow1));
        tagsContainer.appendChild(createTagRow(tagsRow2));
      } else {
        [...tagsRow1, ...tagsRow2].forEach(tag => {
          const a = document.createElement('a');
          a.href = '#';
          a.textContent = `#${tag}`;
          tagsContainer.appendChild(a);
        });
      }
    };
  
    const moveTags = () => {
      renderTags();
      const side = heroContainer.querySelector('.hero-side');
      if (window.innerWidth >= 1440) {
        side.appendChild(tagsContainer);
      } else {
        heroContainer.appendChild(tagsContainer);
      }
    };
  
    moveTags();
    window.addEventListener('resize', moveTags);
  }
  
  renderHero();