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
