// popper.js 
// see https://popper.js.org/

const tools = require('tool-box');
const lazyload = require('lazyload');
const sources = window.VARIABLES.sources;

lazyload.js([sources.popper.js], function() {
  
  if(!window.Popper) return;

  let popoverToggles = document.querySelectorAll('[data-one-toggle=popover]');
  popoverToggles.forEach(toggle => {
    // adapt
    let content = toggle.getAttribute('data-one-content');
    if(!content) return;
    let title = toggle.getAttribute('data-one-title');
    // assemble
    let popper = new Popper(toggle, title, content);
    // trigger
    let triggerStr = toggle.getAttribute('data-one-trigger') || 'click'; //  click | hover | focus | manual. manual cannot be combined with any other trigger.
    let triggers = triggerStr.split(/\s+/).filter(str => str!='');
    triggers.forEach(trigger => {
      switch (trigger) {
        case 'click': addListener4Click(toggle, popper); break;
        case 'hover': addListener4Hover(toggle, popper); break;
        case 'focus': addListener4focus(toggle, popper); break;
        case 'manual':
        default: break;
      }
    });
  });
});

// focus
function addListener4focus(toggle, popover) {
  toggle.addEventListener('focus', () => {
    popover.show();
  });
  toggle.addEventListener('focusout', () => {
    popover.hide();
  });
}

// hover
function addListener4Hover(toggle, popover) {
  toggle.addEventListener('mouseover', () => {
    popover.show();
  });
  toggle.addEventListener('mouseout', () => {
    popover.hide();
  });
}

// click
function addListener4Click(toggle, popover) {
  let count=0;
  toggle.addEventListener('click', () => {
    if(count==0) { // show
      count=1;
      popover.show();
    } else {       // hide
      count=0;
      popover.hide();
    }
  });
}

class Popper {
  constructor(toggle, title, content) {
    this.toggle = toggle;
    this.title = title;
    this.content = content;
    // id
    this.id = this.createId();
    // node
    this.node = this.createDOM(this.id);
    // popper
    window.document.body.appendChild(this.node);
    this.instance = window.Popper.createPopper(this.toggle, this.node, {
      // placement: 'bottom-end',
      modifiers: []
    });
  }

  show() {
    // Make css
    this.node.toggleAttribute('data-show');
    this.toggle.setAttribute('aria-describedby', this.id);

    // Enable the event listeners
    this.instance.setOptions((options) => ({
      ...options,
      modifiers: [
        ...options.modifiers,
        { name: 'eventListeners', enabled: true }
      ]
    }));
  }

  hide() {
    // Hide css
    this.node.removeAttribute('data-show');
    this.toggle.removeAttribute('aria-describedby');

    // Disable the event listeners
    this.instance.setOptions((options) => ({
      ...options,
      modifiers: [
        ...options.modifiers,
        { name: 'eventListeners', enabled: false }
      ]
    }));
  }

  createId() {
    function randomInt() {
      return 'popover' + tools.randomInt(10000, 99999);
    }
    let id;
    do {
      id = randomInt();
    } while (document.getElementById(id));
    return id;
  }

  createDOM(id) {
    // popover dom
    let result = document.createElement('div');
    result.setAttribute('id', id);
    result.classList.add('popover');
    // arrow
    let arrow = document.createElement('div');
    arrow.classList.add('popover-arrow');
    arrow.toggleAttribute('data-popper-arrow');
    result.appendChild(arrow);
    // title
    if(this.title) {
      let titleDOM = document.createElement('h3');
      titleDOM.innerHTML=this.title;
      titleDOM.classList.add('popover-header');
      result.appendChild(titleDOM);
    }
    // content
    let contentDOM = document.createElement('div');
    contentDOM.innerHTML = this.content;
    contentDOM.classList.add('popover-body');
    result.appendChild(contentDOM);
    return result;
  }
}
