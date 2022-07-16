const lazyload = require('lazyload');
const TOOL = require('tool-box');
const {Swiper} = require('lib/swiper');

lazyload.onload(() => {
  window.document.querySelectorAll('.swiper').forEach(dom => {
    try {
      new Swiper(dom).init();
    } catch(err) {
      TOOL.logger.error('problem dom:', dom, '\n', err);
    }
  });
});
