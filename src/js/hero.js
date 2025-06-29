const heroContainer = document.getElementById('heroContainer');
const tagsList = document.getElementById('heroTags');
const sideWrapper = heroContainer?.querySelector('.hero-side');
const bottomImage = heroContainer?.querySelector('.hero-bottom-image');

function moveTags() {
  if (!tagsList || !sideWrapper || !bottomImage) return;

  if (window.innerWidth >= 1440) {
    if (!sideWrapper.contains(tagsList)) {
      sideWrapper.appendChild(tagsList);
    }
  } else {
    if (tagsList.previousElementSibling !== bottomImage) {
      bottomImage.insertAdjacentElement('afterend', tagsList);
    }
  }
}

function throttle(fn, wait) {
  let isThrottled = false;
  return function (...args) {
    if (!isThrottled) {
      fn.apply(this, args);
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, wait);
    }
  };
}

moveTags();

window.addEventListener('resize', throttle(moveTags, 200));