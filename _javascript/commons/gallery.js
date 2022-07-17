const lazyload = require('lazyload');
const TOOL = require('tool-box');
const {Modal} = require('lib/modal');
const {Swiper} = require('lib/swiper');

lazyload.onload(() => {
  const galleryMap = {};
  let galleryDefaultId;
  window.document.querySelectorAll('img[data-toggle=gallery]').forEach(dom => {
    const id = dom.getAttribute('data-gallery-id') || galleryDefaultId || (galleryDefaultId=TOOL.generateId('gallery'));
    const imgDomList = galleryMap[id] || (galleryMap[id]=[]);
    imgDomList.push(dom);
  });
  Object.keys(galleryMap).forEach(key => {
    const imgDomList = galleryMap[key];
    const gallery = new Gallery(imgDomList, {
      id: key
    });
    gallery.init();
  });
});

function generateSwiperDom(imgUrlList) {
  // swiper
  const swiperDOM = window.document.createElement('div');
  swiperDOM.classList.add('swiper');
  swiperDOM.classList.add('gallery');
  // slide container
  const slideListDom = window.document.createElement('div');
  swiperDOM.appendChild(slideListDom);
  slideListDom.classList.add('swiper__slides');
  imgUrlList.forEach(imgUrl => {
    // slide
    const slideDOM = window.document.createElement('div');
    slideListDom.appendChild(slideDOM);
    slideDOM.classList.add('swiper__slide');
    slideDOM.classList.add('gallery__item');
    // img
    const imgDOM = window.document.createElement('img');
    slideDOM.appendChild(imgDOM);
    imgDOM.src = imgUrl;
  });
  // prev/next button
  if(imgUrlList.length > 0){
    const prevButton = window.document.createElement('div');
    prevButton.classList.add('swiper__button', 'swiper__button--prev', 'fas', 'fa-chevron-left');
    const nextButton = window.document.createElement('div');
    nextButton.classList.add('swiper__button', 'swiper__button--next', 'fas', 'fa-chevron-right');
    swiperDOM.append(prevButton);
    swiperDOM.append(nextButton);
  }
  return swiperDOM;
}

class Gallery {
  constructor(imgDomList, options={}) {
    this.imgDomList       = imgDomList;
    this.id               = options.id                || TOOL.generateId('gallery');
  }
  init() {
    const context = this;
    // swiper
    const swiperDOM = generateSwiperDom(
      this.imgDomList.map(imgDom => {
        return imgDom.src;
      })
    );
    this.swiper = new Swiper(swiperDOM).init();
    // modal
    const showGalleryClass = 'show-gallery';
    this.modal = new Modal({
      showCallback: () => {
        setTimeout(() => {
          swiperDOM.classList.add(showGalleryClass);
        }, 0);
      },
      hideCallback: () => {
        swiperDOM.classList.remove(showGalleryClass);
      }
    });
    this.modal.enableEventEscClose();
    this.modal.appendChild(swiperDOM);
    // assemble
    const swiperImgDomList = Array.from(swiperDOM.querySelectorAll('.gallery__item img'));
    const buttonDomList = Array.from(swiperDOM.querySelectorAll('.swiper__button'));
    // listener
    // img click
    this.imgDomList.forEach(imgDom => {
      imgDom.addEventListener('click', (e) => {
        context.show(e);
        const clickImgIndex = context.imgDomList.findIndex(imgDom => imgDom == e.target);
        context.swiper.moveTo(clickImgIndex, {
          animation: false
        });
      });
    });
    // modal click/drag
    let pageX, pageY;
    this.modal.addEventListener('mousedown', (e) => {
      pageX=e.pageX; pageY=e.pageY;
    });
    this.modal.addEventListener('mouseup', (e) => {
      const moveDistance = Math.abs(pageX-e.pageX)+Math.abs(pageY-e.pageY);
      if(moveDistance<3) {
        if(!swiperImgDomList.includes(e.target) && !buttonDomList.includes(e.target)) { // hide when the clicked dom is not img
          context.hide(e);
        }
      }
    });
    // Char Code: 37  ⬅, 39  ➡
    this.enableEventPrevOrNext();
  }
  enableEventPrevOrNext() {
    const context=this;
    let func;
    this.modal.addShowCallback(() => {
      window.document.addEventListener('keydown', func = (e) => {
        TOOL.logger.isDebug() && TOOL.logger.debug(e);
        // Char Code: 37  ⬅, 39  ➡
        if(e.keyCode == 37){ // ⬅
          context.swiper.prev();
        } else if(e.keyCode == 39) { // ➡
          context.swiper.next();
        }
      });
    });
    this.modal.addHideCallback(() => {
      window.document.removeEventListener('keydown', func);
    });
  }
  show(event) {
    TOOL.logger.isDebug() && TOOL.logger.debug(event);
    this.modal.show();
  }
  hide(event) {
    TOOL.logger.isDebug() && TOOL.logger.debug(event);
    this.modal.hide();
  }
}
