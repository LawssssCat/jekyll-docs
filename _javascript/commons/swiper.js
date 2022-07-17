const lazyload = require('lazyload');
const {Swiper} = require('lib/swiper');
const logger = require('logger');

lazyload.onload(() => {
  window.document.querySelectorAll('.swiper').forEach(dom => {
    try {
      new Swiper(dom).init();
    } catch(err) {
      logger.error('problem dom:', dom, '\n', err);
    }
  });
});
