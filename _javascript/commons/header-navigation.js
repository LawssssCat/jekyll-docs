// popper.js 
// see https://popper.js.org/

const TOOL = require('tool-box');
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

  // init subnav poppover
  const subNavs = [];
  navs.forEach(item => {
    let subNav = new SubNav(item.nav, item.subnav);
    subNav.init();
    subNavs.push(subNav);
  });

  // listen to change poppover
  if (subNavs.length>0) {
    const toggle = window.document.querySelector('.navigation__toggle');
    TOOL.respondToVisibility(toggle, (visible) => {
      if (visible) {
        subNavs.forEach(subNav => {
          subNav.disable();
        });
      } else {
        subNavs.forEach(subNav => {
          subNav.enable();
        });
      }
    });
  }

});

const showClass = 'data-hover-sub_navigation';
const showEvents = ['mouseenter', 'focus'];
const hideEvents = ['mouseleave', 'blur'];

class SubNav {
  constructor(nav, subnav) {
    this.nav = nav;
    this.subnav = subnav;
    this.generateSnapshot();
    this.popover = window.Popper.createPopper(this.nav, this.subnav, {
      placement: 'bottom'
    });
  }
  generateSnapshot() {
    this.subnavClone = this.subnav.cloneNode(true);
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
  disable() {
    if(!this.disableStatus) {
      this.subnav.remove();
      this.subnavClone.remove();
      this.nav.appendChild(this.subnavClone);
    }
    this.disableStatus=true;
  }
  enable() {
    if(this.disableStatus) {
      this.subnav.remove();
      this.subnavClone.remove();
      this.nav.appendChild(this.subnav);
      // Update its position
      this.popover.update();
    }
    this.disableStatus=false;
  }
}
