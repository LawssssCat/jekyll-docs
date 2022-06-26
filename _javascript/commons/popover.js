const tools = require('tool-box');
const lazyload = require('lazyload');
const sources = window.VARIABLES.sources;

lazyload.js([sources.popper.js], function() {
  
  if(!window.Popper) return;

  let popoverToggles = document.querySelectorAll('[data-one-toggle=popover]');
  popoverToggles.forEach(toggle => {
    let content = toggle.getAttribute('data-one-content');
    if(!content) return;
    let title = toggle.getAttribute('data-one-title');
    let triggerStr = toggle.getAttribute('data-one-trigger') || 'click'; //  click | hover | focus | manual. manual cannot be combined with any other trigger.
    let triggers = triggerStr.split(/\s+/).filter(str => str!='');
    triggers.forEach(trigger => {
      switch (trigger) {
        case 'click': addListener4Click(toggle, title, content); break;
        case 'hover': addListener4Hover(toggle, title, content); break;
        case 'focus': addListener4focus(toggle, title, content); break;
        case 'manual':
        default: break;
      }
    });
  });
});

// focus
function addListener4focus(toggle, title, content) {
  let popover=new Popper(toggle, title, content);
  toggle.addEventListener('focus', () => {
    popover.show();
  });
  toggle.addEventListener('focusout', () => {
    popover.hide();
  });
}

// hover
function addListener4Hover(toggle, title, content) {
  let popover=new Popper(toggle, title, content);
  toggle.addEventListener('mouseover', () => {
    popover.show();
  });
  toggle.addEventListener('mouseout', () => {
    popover.hide();
  });
}

// click
function addListener4Click(toggle, title, content) {
  let count=0, popover=new Popper(toggle, title, content);
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
  }

  show() {
    // refresh id
    this.id = this.createId();
    this.node = this.createDOM(this.id);
    window.document.body.appendChild(this.node);
    window.Popper.createPopper(this.toggle, this.node, {

    });
    this.toggle.setAttribute('aria-describedby', this.id);
  }

  hide() {
    this.node.remove();
    this.toggle.setAttribute('aria-describedby', null);
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
    result.appendChild(arrow);
    // title
    if(this.title) {
      let titleDOM = document.createElement('h3');
      titleDOM.innerHTML=this.title;
      result.appendChild(titleDOM);
    }
    // content
    let contentDOM = document.createElement('div');
    contentDOM.innerHTML = this.content;
    result.appendChild(contentDOM);
    return result;
  }
}
