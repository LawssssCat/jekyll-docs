const lazyload = require('lazyload');
const tocSettings = window.VARIABLES.toc;

lazyload.onload(() => {
  const {Toc} = require('lib/toc');
  const toc = new Toc({
    headerSelectors: tocSettings.selectors
  });
  toc.init();
});
