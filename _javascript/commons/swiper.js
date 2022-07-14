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
    config.slideContainerAnimationSwitch   = options.slideContainerAnimationSwitch    || 'data-swiper-animation';
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
    this.reset();
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
    this.bundleTouchEventListener(); // touch/mouseDown move
  }
  reset() {
    // touch move offset init
    this.slideContainerTranslateX = 0;
    this.slideContainerTranslateOffseX = 0; 
    // animation
    this.isAnimationFlag = 'close' != this.dom.getAttribute(this.config.slideContainerAnimationSwitch);
    // init status
    this.refresh(true);
  }
  bundleTouchEventListener() {
    const context = this;
    const slideContainer = this.slideContainer;
    let touch = false;
    let touchPageX;
    let mousedownListenerFunc;
    slideContainer.addEventListener('mousedown', mousedownListenerFunc = (e) => {
      touch = true;
      const point = e.targetTouches ? e.targetTouches[0] : e;
      touchPageX = point.pageX;
    });
    slideContainer.addEventListener('touchstart', mousedownListenerFunc);
    let mouseupListenerFunc;
    slideContainer.addEventListener('mouseup', mouseupListenerFunc = (e) => {
      TOOL.logger.isDebug() && TOOL.logger.debug(e);
      touch = false;
      const slideIndexAdjust = context.getSlideIndexAdjust();
      context.moveTo(slideIndexAdjust, {
        animation: true,
        offset: 0
      });
    });
    slideContainer.addEventListener('mouseleave', mouseupListenerFunc);
    slideContainer.addEventListener('touchend', mouseupListenerFunc);
    slideContainer.addEventListener('touchcancel', mouseupListenerFunc);
    let mousemoveListenerFunc;
    slideContainer.addEventListener('mousemove', mousemoveListenerFunc = (e) => {
      if(touch) {
        const point = e.targetTouches ? e.targetTouches[0] : e;
        const movePageX = point.pageX - touchPageX;
        context.moveTo(context.slideIndexCur, {
          animation: false,
          offset: movePageX
        });
        e.preventDefault(); // prevent 'select' and 'drop' that has been 'select'
      }
    });
    slideContainer.addEventListener('touchmove', mousemoveListenerFunc);
  }
  getSlideIndexAdjust() {
    const offsetX = this.slideContainerTranslateOffseX;
    const slideWidth = TOOL.innerWidth(this.slideContainer);
    if(Math.abs(offsetX) > (slideWidth/4)) {
      if(offsetX < 0) { // end ← start
        return this.slideIndexCur + 1;
      } else { // start → end
        return this.slideIndexCur - 1;
      }
    }
    return this.slideIndexCur;
  }
  isAnimation() {
    return this.isAnimationFlag;
  }
  setAnimation() {
    this.slideContainer.classList.add(this.config.slideContainerAnimationClass);
    let listenerFunc;
    this.slideContainer.addEventListener('transitionend', listenerFunc = () => {
      this.slideContainer.classList.remove(this.config.slideContainerAnimationClass);
      this.slideContainer.removeEventListener('transitionend', listenerFunc);
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
    // offset
    const offsetX = this.slideContainerTranslateOffseX = options.offset ? options.offset : 0;
    const slideWidth = TOOL.innerWidth(this.slideContainer);
    const translateXOld = this.slideContainerTranslateX;
    const translateX = this.slideContainerTranslateX = offsetX - (this.slideIndexCur * slideWidth);
    if(translateX != translateXOld) {
      // animation
      if((options.animation == true) || (this.isAnimation() && options.animation != false)) {
        this.setAnimation();
      }
    }
    domFunc.translateX(this.slideContainer, translateX);
    // button
    if(this.hasPrev()) {
      domFunc.enable(this.buttonPrev);
    } else {
      domFunc.disable(this.buttonPrev);
    }
    if(this.hasNext()) {
      domFunc.enable(this.buttonNext);
    } else {
      domFunc.disable(this.buttonNext);
    }
  }
  refresh(animation=false) {
    this.moveTo(this.slideIndexCur, {
      animation: animation
    });
  }
  hasPrev(index = this.slideIndexCur) {
    return index > 0;
  }
  hasNext(index = this.slideIndexCur) {
    return index < (this.slideList.length-1);
  }
  prev() {
    const index = this.slideIndexCur-1;
    this.moveTo(index);
  }
  next() {
    const index = this.slideIndexCur+1;
    this.moveTo(index);
  }
}
