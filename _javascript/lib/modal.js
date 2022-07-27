const logger = require('logger');
const TOOL = require('tool-box');

class Modal {
  constructor(options={}) {
    this.container         = options.container          || window.document.body;
    const config = this.config = {};
    config.modalClass      = options.modalClass         || 'modal';
    config.modalShowClass  = options.modalShowClass     || 'modal--show';
    this.hideCallback      = options.hideCallback;
    this.showCallback      = options.showCallback;
    // node
    this.node = window.document.createElement('div');
    this.node.classList.add(this.config.modalClass);
    // status
    this.isShow = false;
  }
  show() {
    if(!this.isShow) {
      TOOL.lockScroll();
      this.container.appendChild(this.node);
      this.node.classList.add(this.config.modalShowClass);
      this.showCallback && this.showCallback(this);
    }
    this.isShow = true;
  }
  hide() {
    if(this.isShow) {
      TOOL.unlockScroll();
      let TransitionedFunc;
      this.node.addEventListener('transitionend', TransitionedFunc = () => {
        this.node.removeEventListener('transitionend', TransitionedFunc);
        this.container.removeChild(this.node);
      });
      this.node.classList.remove(this.config.modalShowClass);
      this.hideCallback && this.hideCallback(this);
    }
    this.isShow = false;
  }
  addCallback(callbackName, callback) {
    if(!this[callbackName]) {
      this[callbackName] = callback;
    } else {
      const callbackListName = `_${callbackName}List`;
      if(this[callbackListName]) {
        this[callbackListName].push(callback);
      } else {
        const context = this;
        const callList = this[callbackListName] = [];
        callList.push(this[callbackName]);
        callList.push(callback);
        this[callbackName] = (...args) => {
          callList.forEach(cb => {
            try {
              cb.call(context, ...args);
            } catch(error) {
              logger.error(context, cb, ...args);
            }
          });
        };
      }
    }
  }
  addShowCallback(callback) {
    this.addCallback('showCallback', callback);
  }
  addHideCallback(callback) {
    this.addCallback('hideCallback', callback);
  }
  enableEventEscClose() {
    const context=this;
    let func;
    this.addShowCallback(() => {
      window.document.addEventListener('keydown', func = (e) => {
        if(e.keyCode == 27){ // 'ESC'
          context.hide();
        }
      });
    });
    this.addHideCallback(() => {
      window.document.removeEventListener('keydown', func);
    });
  }
  addEventListener(...args) {
    this.node.addEventListener(...args);
  }
  appendChild(dom) {
    this.node.appendChild(dom);
  }
}

module.exports = {
  Modal
};
