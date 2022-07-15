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
  }
  scrollDisable() {
    this.containerOverflowY = this.container.style.overflowY;
    this.container.style.overflowY = 'hidden';
  }
  scrollEnable() {
    this.container.style.overflowY = this.containerOverflowY || '';
  }
  show() {
    this.scrollDisable();
    this.node.classList.add(this.config.modalShowClass);
    this.container.appendChild(this.node);
    this.showCallback && this.showCallback();
  }
  hide() {
    this.scrollEnable();
    let TransitionedFunc;
    this.node.addEventListener('transitionend', TransitionedFunc = () => {
      this.container.removeChild(this.node);
      this.node.removeEventListener('transitionend', TransitionedFunc);
    });
    this.node.classList.remove(this.config.modalShowClass);
    this.hideCallback && this.hideCallback();
  }
  addEventListener(...args) {
    this.node.addEventListener(...args);
  }
}

module.exports = {
  Modal
};
