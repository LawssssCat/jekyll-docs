const lazyload = require('lazyload');

lazyload.onload(() => {
  const root    =window.document.querySelector('.js-page-root');
  const toggle  =window.document.querySelector('.page__sidebar-toggle');
  const activeClass = 'sidebar-active';
  const activeLocalName = 'sidebar-expand';
  function expand() {
    root.classList.add(activeClass);
    window.localStorage.setItem(activeLocalName, 'true');
  }
  function fold() {
    root.classList.remove(activeClass);
    window.localStorage.setItem(activeLocalName, 'false');
  }
  if(window.localStorage.getItem(activeLocalName) == 'true') {
    expand();
  } else {
    root.classList.remove(activeClass);
  }
  toggle.addEventListener('click', () => {
    if(root.classList.contains(activeClass)) {
      // close
      fold();
    } else {
      // open
      expand();
    }
  });
});
