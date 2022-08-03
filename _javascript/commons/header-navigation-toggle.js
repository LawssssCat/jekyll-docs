const lazyload = require('lazyload');
const TOOL = require('tool-box');

lazyload.onload(() => {
  const header = window.document.querySelector('.js-header');
  const toggle = window.document.querySelector('.navigation__toggle');
  const toggleClassName = 'navigation--mobile-open';
  toggle.addEventListener('click', (e) => {
    if((e.composedPath?e.composedPath():e.path).includes(toggle) && !header.classList.contains(toggleClassName)) {
      header.classList.add(toggleClassName);
    } else {
      header.classList.remove(toggleClassName);
    }
  });
  TOOL.respondToVisibility(toggle, (visible) => {
    if(!visible) {
      header.classList.remove(toggleClassName);
    }
  });
});

lazyload.onload(() => {
  const toggleClassName = 'sub_navigation-open';
  Array.from(window.document.querySelectorAll('.navigation__item')).forEach(nav => {
    let subnavToggle = nav.querySelector('.navigation__item-sub_icon');
    if(subnavToggle) {
      subnavToggle.addEventListener('click', () => {
        if(nav.classList.contains(toggleClassName)) {
          nav.classList.remove(toggleClassName);
        } else {
          nav.classList.add(toggleClassName);
        }
      });
    }
  });
});
