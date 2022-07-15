class Prompt {
  constructor(options={}) {
    // 
    this.position = options.position || 'bottom';
    // 
    this.prompt = window.document.createElement('div');
    this.init();
    window.document.body.append(this.prompt);
    this.hide();
  }
  set text(str) {
    this.prompt.innerHTML = str;
  }
  init() {
    this.prompt.style.position = 'fixed';
    this.prompt.style.overflow = 'hiden';
    this.prompt.style.zIndex = '999';
    this.prompt.style.color = '#f3f3f3';
    this.prompt.style.background = '#3f3f3f';
    this.prompt.style.transition = 'opacity .5s';
    this.prompt.style.padding = '.25em .5em';
    this.prompt.style.borderRadius = '.5em';
  }
  hide() {
    this.prompt.style.display = 'none';
    this.prompt.style.opacity = '0';
  }
  show() {
    this.prompt.style.display = 'block';
    let width=this.prompt.offsetWidth, height=this.prompt.offsetHeight;
    this.prompt.style.left = `calc(50vw - ${width/2}px)`;
    switch (this.position) {
      case 'top':
        this.prompt.style.top = '1em';
        break;
      case 'middle':
        this.prompt.style.top = `calc(50vh - ${height}px - 1em)`;
        break;
      case 'bottom':
      default:
        this.prompt.style.top = `calc(100vh - ${height}px - 1em)`;
        break;
    }
    this.prompt.style.opacity = '1';
  }
  remove() {
    this.prompt.style.opacity = '0';
    let func;
    this.prompt.addEventListener('transitionend', func = () => {
      this.prompt.remove();
      this.prompt.removeEventListener('transitionend', func);
    });
  }
}

module.exports = {
  Prompt
};
