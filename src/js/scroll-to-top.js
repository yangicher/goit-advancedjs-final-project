// Get the button:
let scrollTopBtn = document.getElementById('scrollTopButton');

if (scrollTopBtn) {
  scrollTopBtn.onclick = function () {
    topFunction();
  };
}

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollTopBtn.style.display = 'flex';
  } else {
    scrollTopBtn.style.display = 'none';
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scroll({behavior: 'smooth', top: 0}); // For Safari
  document.documentElement.scroll({behavior: 'smooth', top: 0}); // For Chrome, Firefox, IE and Opera
}
