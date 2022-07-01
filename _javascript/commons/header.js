const lazyload = require('lazyload');
const TOOL = require('tool-box');

/**
 * hide some doms in header when header navigation overflow-x
 */
const headerMainSelector     = '.page__header .main',
  headerTitleSelector        = '.page__header .main .header__title', 
  headerNavigationSelector   = '.page__header .main .navigation', 
  hiddenPirority = [
    '.page__header .main .header__title .theme-btn',
    '.page__header .main .header__title .header__brand-title'
  ];
lazyload.onload(() => {
  // window.document.querySelector('.header__title .header__brand-title').style.display = '';
  window.addEventListener('resize', () => {
    /*
    | ------------------------------- headerMain --------------------------------- |
    | ------------ headerTitle ------------ | --------- headerNavigation --------- |
     */
    const headerMain         = window.document.querySelector(headerMainSelector),
      headerTitle            = window.document.querySelector(headerTitleSelector),
      headerNavigation       = window.document.querySelector(headerNavigationSelector);
    /* 
    | ------------------------------- headerMainInnerWidth --------------------------------- |
    | ---------- headerTitleOutterWidth ---------- | ----- headerNavigationOutterWidth ----- |
    | ---- headerTitleChildTotalOutterWidth ----|  |
    */
    const headerMainInnerWidth              =Math.ceil(TOOL.innerWidth(headerMain)),
      headerTitleChildTotalOutterWidth      =Math.ceil(TOOL.childTotalWidth(headerTitle)),
      // headerNavigationOutterWidth           =Math.ceil(TOOL.outterWidth(headerNavigation)),
      flag=TOOL.isOverflowX(headerNavigation);
      // flag = headerMainInnerWidth<(headerTitleChildTotalOutterWidth+headerNavigation.scrollWidth);
    // console.log(flag, headerMainInnerWidth,headerTitleChildTotalOutterWidth,headerNavigationOutterWidth, headerNavigation.scrollWidth);debugger
    if(flag) {
      let i, hideDom=[], calcWidth=(headerTitleChildTotalOutterWidth+headerNavigation.scrollWidth);
      for(i=0; i<hiddenPirority.length; i++) {
        const canHideDom = window.document.querySelector(hiddenPirority[i]);
        if(TOOL.isHidden(canHideDom)) {
          continue;
        }
        const canHideDomOutterWidth = TOOL.outterWidth(canHideDom);
        hideDom.push(canHideDom);
        calcWidth-=canHideDomOutterWidth;
        if(headerMainInnerWidth>=calcWidth) {
          break;
        }
      }
      hideDom.forEach(dom => {
        dom.style.display = 'none';
      });
    } else {
      let i, showDom=[], calcWidth=(headerTitleChildTotalOutterWidth+headerNavigation.scrollWidth);
      for(i=hiddenPirority.length-1; i>=0; i--) {
        const canShowDom = window.document.querySelector(hiddenPirority[i]);
        if(!TOOL.isHidden(canShowDom)) {
          continue;
        }
        const canShowDomOutterWidth = TOOL.outterWidth(canShowDom);
        calcWidth+=canShowDomOutterWidth;
        if(calcWidth<headerMainInnerWidth) {
          showDom.push(canShowDom);
        } else {
          break;
        }
      }
      showDom.forEach(dom => {
        dom.style.display = '';
      });
    }
  });
});
