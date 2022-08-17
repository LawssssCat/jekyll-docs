const lazyload = require('lazyload');
const TOOL = require('tool-box');

/**
 * change scroll on load if the last active is hidden because of overflow-y
 */
lazyload.onload(() => {
  const quicklinksScroller = window.document.querySelector('.page__sidebar');
  if(TOOL.isOverflowY(quicklinksScroller)) {
    const activeList = quicklinksScroller.querySelectorAll('.active');
    if(activeList && activeList.length>0) {
      const activeFirst=activeList[0];
      const activeLast=activeList[activeList.length-1];
      const activeFirstTop=TOOL.positionRelative(activeFirst, quicklinksScroller).top;
      const activeLastTop=TOOL.positionRelative(activeLast, quicklinksScroller).top;
      const activeHeight=activeLastTop-activeFirstTop;
      const scrollHeight=quicklinksScroller.clientHeight;
      let toTop;
      if(scrollHeight>activeHeight) {
        toTop = activeFirstTop;
      } else {
        toTop = activeLastTop - scrollHeight;
      }
      quicklinksScroller.scroll({
        top: toTop,
        behavior: 'smooth'
      });
    }
  }
});
