const lazyload = require('lazyload');
const TOOL = require('tool-box');

lazyload.onload(() => {
  window.document.querySelectorAll('.swiper').forEach(dom => {
    new Swiper(dom).init();
  });
});

const domFunc = (function() {
  const FUNC = {};
  FUNC.translateX = function(dom, offset) {
    dom.style.transform = `translate(${offset}px, 0)`;
  };
  const disabledClass = 'disabled';
  FUNC.enable = function(dom) {
    dom.classList.remove(disabledClass);
  };
  FUNC.disable = function(dom) {
    dom.classList.add(disabledClass);
  };
  return FUNC;
})();

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
    new ResizeObserver(() => {
      context.refresh();
    }).observe(slideContainer);
  }
  moveTo(index) {
    let moveToIndex, leftIndex=0, rightIndex=this.slideList.length-1;
    if(index<leftIndex) {
      moveToIndex = leftIndex;
    } else if (index>rightIndex) {
      moveToIndex = rightIndex;
    } else {
      moveToIndex = index;
    }
    const slide = this.slideList[this.slideIndexCur=moveToIndex];
    const offset = TOOL.positionRelative(slide, this.slideContainer).left;
    domFunc.translateX(this.slideContainer, -offset);
    if(this.slideIndexCur == leftIndex) {
      domFunc.disable(this.buttonPrev);
    } else {
      domFunc.enable(this.buttonPrev);
    }
    if(this.slideIndexCur == rightIndex) {
      domFunc.disable(this.buttonNext);
    } else {
      domFunc.enable(this.buttonNext);
    }
  }
  refresh() {
    this.moveTo(this.slideIndexCur);
  }
  prev() {
    this.moveTo(this.slideIndexCur-1);
  }
  next() {
    this.moveTo(this.slideIndexCur+1);
  }
}
