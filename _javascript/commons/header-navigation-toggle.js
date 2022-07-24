const lazyload = require('lazyload');
const TOOL = require('tool-box');

lazyload.onload(() => {
  const header = window.document.querySelector('.js-header');
  const toggle = window.document.querySelector('.navigation__toggle');
  const toggleClassName = 'navigation--mobile-open';
  window.addEventListener('click', (e) => {
    if(!e.path.includes(header)) {
      header.classList.remove(toggleClassName);
    } else {
      if(e.path.includes(toggle)) {
        if(header.classList.contains(toggleClassName)) {
          header.classList.remove(toggleClassName);
        } else {
          header.classList.add(toggleClassName);
        }
      }
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
