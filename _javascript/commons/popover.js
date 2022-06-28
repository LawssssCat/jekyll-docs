// popper.js 
// see https://popper.js.org/

const tools = require('tool-box');
const lazyload = require('lazyload');
const sources = window.VARIABLES.sources;

function isInited(toggle) {
  let id = toggle.getAttribute('aria-describedby');
  let popover = window.document.querySelector(`#${id}`);
  if(popover) {
    return true;
  } else {
    return false;
  }
}
function popoverInit() {
  lazyload.js([sources.popper.js], function() {
    
    if(!window.Popper) throw new Error('need Popper obj from popper.js');
  
    let popoverToggles = document.querySelectorAll('[data-one-toggle=popover]');
    popoverToggles.forEach(toggle => {
      if(isInited(toggle)) return;
      // adapter
      let adapter = new PopperAdapter(toggle);
      // assemble
      let popper = new Popper(adapter);
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
}

popoverInit();
window.popoverInit = popoverInit;

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

class PopperAdapter {
  constructor(toggle) {
    this.toggle = toggle;
  }
  refresh() {
    this.content = this.toggle.getAttribute('data-one-content');
    this.title = this.toggle.getAttribute('data-one-title');
  }
}

class Popper {
  constructor(adapter) {
    this.adapter = adapter;
    this.adapter.refresh();

    // id
    this.id = tools.generateId('popover');
    this.adapter.toggle.setAttribute('aria-describedby', this.id);
    // node
    this.node = this.createDOM(this.id);
    // popper
    window.document.body.appendChild(this.node);
    this.instance = window.Popper.createPopper(this.adapter.toggle, this.node, {
      // placement: 'bottom-end',
      modifiers: []
    });
  }

  refresh() {
    this.adapter.refresh();
    if(this.node) {
      let header = this.node.querySelector('.popover-header');
      if(header) header.innerHTML = this.adapter.title;
      let body = this.node.querySelector('.popover-body');
      if(body) body.innerHTML = this.adapter.content;
    }
  }

  show() {
    this.refresh();
    // Make css
    this.node.toggleAttribute('data-show');

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

    // Disable the event listeners
    this.instance.setOptions((options) => ({
      ...options,
      modifiers: [
        ...options.modifiers,
        { name: 'eventListeners', enabled: false }
      ]
    }));
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
    if(this.adapter.title) {
      let titleDOM = document.createElement('h3');
      titleDOM.innerHTML=this.adapter.title;
      titleDOM.classList.add('popover-header');
      result.appendChild(titleDOM);
    }
    // content
    let contentDOM = document.createElement('div');
    contentDOM.innerHTML = this.adapter.content;
    contentDOM.classList.add('popover-body');
    result.appendChild(contentDOM);
    return result;
  }
}
