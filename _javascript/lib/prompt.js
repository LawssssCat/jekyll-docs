class Prompt {
  constructor() {
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
    this.prompt.style.top = `calc(100vh - ${height}px - 1em)`;
    this.prompt.style.opacity = '1';
  }
  remove() {
    this.prompt.style.opacity = '0';
    this.prompt.addEventListener('transitionend', () => {
      this.prompt.remove();
    });
  }
}

module.exports = {
  Prompt
};
