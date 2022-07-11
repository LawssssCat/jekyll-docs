const lazyload = require('lazyload');
const TOOL = require('tool-box');

lazyload.onload(() => {
  const hash = window.location.hash;
  if(hash) {
    const id = hash.slice(1);
    const dom = window.document.getElementById(id);
    if(dom) {
      const headerTop = TOOL.positionRelative(dom, window.VARIABLES.pageScroller).top;
      window.VARIABLES.pageScrollTarget.scroll({
        top: headerTop,
        behavior: 'smooth'
      });
    }
  }
});
