const lazyload = require('lazyload');
const TOOL = require('tool-box');

lazyload.onload(() => {
  window.document.querySelectorAll('.swiper').forEach(dom => {
    try {
      new Swiper(dom).init();
    } catch(err) {
      TOOL.logger.error('problem dom:', dom, '\n', err);
    }
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
    config.slideContainerSelector          = options.slideContainerSelector           || '.swiper__slides';
    config.slideContainerAnimationClass    = options.slideContainerAnimationClass     || 'swiper__slides--animation';
    config.slideSelector                   = options.slideSelector                    || '.swiper__slide';
    config.slideIndex                      = options.slideIndex                       || 0;
    config.buttonPrevSelector              = options.buttonPrevSelector               || '.swiper__button.swiper__button--prev';
    config.buttonNextSelector              = options.buttonNextSelector               || '.swiper__button.swiper__button--next';
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
  setTransition() {
    this.slideContainer.classList.add(this.config.slideContainerAnimationClass);
    this.slideContainer.addEventListener('transitionend', () => {
      this.slideContainer.classList.remove(this.config.slideContainerAnimationClass);
    });
  }
  moveTo(index, options={}) {
    // index
    let leftIndex=0, rightIndex=this.slideList.length-1;
    if(index<leftIndex) {
      this.slideIndexCur = leftIndex;
    } else if (index>rightIndex) {
      this.slideIndexCur = rightIndex;
    } else {
      this.slideIndexCur = index;
    }
    // animation
    if(options.animation != false) {
      this.setTransition();
    }
    // offset
    const slide = this.slideList[this.slideIndexCur];
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
    this.moveTo(this.slideIndexCur, {
      animation: false
    });
  }
  prev() {
    this.moveTo(this.slideIndexCur-1);
  }
  next() {
    this.moveTo(this.slideIndexCur+1);
  }
}
