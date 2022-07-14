/**
 * popper.js-based template class for creating popper
 */
const TOOLS = require('tool-box');

function promptError(msg) {
  throw new Error(msg);
}

// focus
function addListener4focus(popover) { // todo test
  popover.toggle.addEventListener('focus', () => {
    popover.show();
  });
  popover.toggle.addEventListener('focusout', () => {
    popover.hide();
  });
}

// hover
function addListener4Hover(popover) {
  popover.toggle.addEventListener('mouseover', () => {
    popover.show();
  });
  popover.toggle.addEventListener('mouseout', () => {
    popover.hide();
  });
}

// click
function addListener4Click(popover) {
  let count=0;
  popover.toggle.addEventListener('click', () => {
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
  constructor(options={}) {
    // popper.js 
    // see https://popper.js.org/
    this.popper         = window.Popper          || promptError('need Popper obj from popper.js');
    this.popperConfig   = options.popperConfig   || {
      placement: options.popperConfigPlacement   || 'top',
      modifiers: [
        {
          name: 'flip',
          options: {
            fallbackPlacements: ['top', 'bottom'] // see https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements
          }
        }
      ]
    };
    this.toggle         = options.toggle         || promptError('"toggle" is required');
    this.toggleEvents   = options.toggleEvents   || []; // support "hover", "focus", "click"
    this.content        = options.content        || promptError('"content" is required');
    this.container      = options.container      || window.document.body;
    this.title          = options.title;
    this.idStatic       = options.id;
    this.showCallback   = options.showCallback;
    this.hideCallback   = options.hideCallback;
  }
  init() {
    if(this.toggleEvents.length > 0) // add event listener
    {
      this.toggleEvents.forEach(event => {
        switch (event) {
          case 'click': addListener4Click(this); break;
          case 'hover': addListener4Hover(this); break;
          case 'focus': addListener4focus(this); break;
          default: break;
        }
      });
    }
  }
  show() {
    // node
    this.id = this.idStatic || TOOLS.generateId('popover');
    this.node = this.createDOM();
    this.container.appendChild(this.node);
    this.node.toggleAttribute('data-show');
    // popper
    this.popperInstance = this.popper.createPopper(this.toggle, this.node, this.popperConfig);
    // Enable the event listeners
    this.popperInstance.setOptions((options) => ({
      ...options,
      modifiers: [
        ...options.modifiers,
        { name: 'eventListeners', enabled: true }
      ]
    }));
    // Update its position
    this.popperInstance.update();
    // callback
    this.showCallback && this.showCallback();
  }
  hide() {
    // Disable the event listeners
    this.popperInstance.setOptions((options) => ({
      ...options,
      modifiers: [
        ...options.modifiers,
        { name: 'eventListeners', enabled: false }
      ]
    }));
    this.popperInstance = null;
    // Hide css
    this.node.removeAttribute('data-show');
    this.container.removeChild(this.node);
    this.node=null;
    // node 
    this.id = null;
    this.hideCallback && this.hideCallback();
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

module.exports = {
  Popper
};
