// popper.js 
// see https://popper.js.org/

const lazyload = require('lazyload');
const sources = window.VARIABLES.sources;

lazyload.js([sources.popper.js], function() {

  if(!window.Popper) throw new Error('need Popper obj from popper.js');

  const navs = []; // nav with sub nav
  Array.from(window.document.querySelectorAll('.navigation__item')).forEach(nav => {
    let subnav = nav.querySelector('.sub_navigation');
    if(subnav) {
      navs.push({
        nav: nav,
        subnav: subnav
      });
    }
  });

  navs.forEach(item => {
    let subNav = new SubNav(item.nav, item.subnav);
    subNav.init();
  });
});

lazyload.onload(() => {
  const header = window.document.querySelector('.js-header');
  const toggle = window.document.querySelector('.navigation__toggle');
  const toggleClassName = 'navigation--mobile-open';
  window.addEventListener('click', (e) => {
    if(!e.path.includes(toggle)) {
      header.classList.remove(toggleClassName);
    } else {
      if(header.classList.contains(toggleClassName)) {
        header.classList.remove(toggleClassName);
      } else {
        header.classList.add(toggleClassName);
      }
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

const showClass = 'data-hover-sub_navigation';
const showEvents = ['mouseenter', 'focus'];
const hideEvents = ['mouseleave', 'blur'];

class SubNav {
  constructor(nav, subnav) {
    this.nav = nav;
    this.subnav = subnav;
    this.popover = window.Popper.createPopper(this.nav, this.subnav, {
      placement: 'bottom'
    });
  }
  init() {
    showEvents.forEach((event) => {
      let _T = this;
      this.nav.addEventListener(event, () => {
        _T.show();
      });
    });

    hideEvents.forEach((event) => {
      let _T = this;
      this.nav.addEventListener(event, () => {
        _T.hide();
      });
    });
  }
  show() {
    // Make the tooltip visible
    this.nav.toggleAttribute(showClass);

    // Enable the event listeners
    this.popover.setOptions((options) => ({
      ...options,
      modifiers: [
        ...options.modifiers,
        { name: 'eventListeners', enabled: true }
      ]
    }));

    // Update its position
    this.popover.update();
  }
  hide() {
    // Hide the tooltip
    this.nav.removeAttribute(showClass);

    // Disable the event listeners
    this.popover.setOptions((options) => ({
      ...options,
      modifiers: [
        ...options.modifiers,
        { name: 'eventListeners', enabled: false }
      ]
    }));
  }
}
