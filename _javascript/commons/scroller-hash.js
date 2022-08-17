const lazyload = require('lazyload');
const TOOL = require('tool-box');
const logger = require('logger');

lazyload.onload(() => {
  refactorHistoryPushStateHandle();
  let eventFunc;
  window.addEventListener('popstate',eventFunc = (event) => {
    logger.isDebug() && logger.debug('scroller-hash.js', event);
    event.preventDefault();
    scroll2Hash(window.VARIABLES.pageScrollerBehavior);
  });
  window.addEventListener('hashchange', eventFunc);
  window.addEventListener('pushState', eventFunc);
  window.addEventListener('replaceState', eventFunc);
}, {
  priority: 99
});

function refactorHistoryPushStateHandle() {
  const _historyWrap = function(type) {
    const orig = history[type];
    const e = new Event(type);
    return function() {
      const rv = orig.apply(this, arguments);
      e.arguments = arguments;
      window.dispatchEvent(e);
      return rv;
    };
  };
  history.pushState = _historyWrap('pushState');
  history.replaceState = _historyWrap('replaceState');
}

function scroll2Hash(behavior) {
  const hash = window.location.hash;
  if(hash) {
    const id = hash.slice(1);
    const dom = window.document.getElementById(id);
    if(dom) {
      const headerTop = TOOL.positionRelative(dom, window.VARIABLES.pageScroller).top;
      window.VARIABLES.pageScrollTarget.scroll({
        top: headerTop,
        behavior: behavior
      });
    }
  }
}
