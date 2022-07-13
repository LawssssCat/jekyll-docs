const lazyload = require('lazyload');
const TOOL = require('tool-box');

lazyload.onload(() => {
  window.document.querySelectorAll('.swiper').forEach(dom => {
    new Swiper(dom).init();
  });
});

class Swiper {
  constructor(dom, options={}) {
    this.dom = dom;
    const config = this.config = {};
    config.slideContainerSelector     = options.slideContainerSelector       || '.swiper__slides';
    config.slideSelector              = options.slideSelector                || '.swiper__slide';
    config.slideIndex                 = options.slideIndex                   || 0;
    config.buttonPrevSelector         = options.buttonPrevSelector           || '.swiper__button.swiper__button--prev';
    config.buttonNextSelector         = options.buttonNextSelector           || '.swiper__button.swiper__button--next';
  }
  init() {
    const dom = this.dom;
    const config = this.config;
    const slideContainer = this.slideContainer = dom.querySelector(config.slideContainerSelector);
    this.slideList = slideContainer.querySelectorAll(config.slideSelector);
    this.slideIndexCur = config.slideIndex;
    this.buttonPrev = dom.querySelector(config.buttonPrevSelector);
    this.buttonNext = dom.querySelector(config.buttonNextSelector);
    // init status
    this.moveTo(this.slideIndexCur);
    // listener
    const context = this;
    this.buttonPrev.addEventListener('click', () => {
      context.prev();
    });
    this.buttonNext.addEventListener('click', () => {
      context.next();
    });
  }
  moveTo(index) {
    let moveToIndex;
    if(index<0) {
      moveToIndex=0;
    } else if (index>=this.slideList.length) {
      moveToIndex=this.slideList.length-1;
    } else {
      moveToIndex=index;
    }
    const slide = this.slideList[this.slideIndexCur=moveToIndex];
    const offset = TOOL.positionRelative(slide, this.slideContainer).left;
    this.slideContainer.style.transform = `translate(-${offset}px, 0)`;
  }
  prev() {
    this.moveTo(this.slideIndexCur-1);
  }
  next() {
    this.moveTo(this.slideIndexCur+1);
  }
}
