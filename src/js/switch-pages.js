const nav = document.querySelector('.nav-items');
const navLinks = document.querySelectorAll('.nav-link');

var childSelected = sessionStorage.getItem('childSelected');

if (childSelected === null) {
  childSelected = 0;
}

navLinks[childSelected].classList.add('selected');

nav.addEventListener('click', function (event) {
  const selectedPageLink = event.target;
  if (
    selectedPageLink.classList.contains('selected') ||
    selectedPageLink.localName != 'a'
  ) {
    return;
  } else {
    navLinks.forEach(link => {
      link.classList.remove('selected');
    });
    selectedPageLink.classList.add('selected');
    sessionStorage.setItem(
      'childSelected',
      Array.from(selectedPageLink.parentNode.parentNode.children).indexOf(
        selectedPageLink.parentNode
      )
    );
  }
});
