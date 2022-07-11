const lazyload = require('lazyload');
const sources = window.VARIABLES.sources;

lazyload.js([sources.leancloud_sdk.js], function() {

  if(!window.AV) throw new Error('needs AV obj from leancloud_sdk.js');
  
  const { appId, appKey, appClass } = window.VARIABLES.paveview;
  const { Pageview } = require('lib/leancloud');
  const pageView = new Pageview(window.AV, {
    appId:     appId,
    appKey:    appKey,
    appClass:  appClass
  });
  actions4Artical(pageView);
});

function actions4Artical(pageView) {
  // article query and increase
  window.document.querySelectorAll('.js-pageview[data-one-page-action=increase]').forEach(item => {
    const key = item.getAttribute('data-one-page-key');
    const title = item.getAttribute('data-one-page-title');
    pageView.increase(key, title, (views) => {
      updateDOMCounter(item, views);
    });
  });
  // article query only
  const articleMap = {};
  window.document.querySelectorAll('.js-pageview[data-one-page-action=query]').forEach(item => {
    const key = item.getAttribute('data-one-page-key');
    articleMap[key] = item;
  });
  const articleMapKeys = Object.keys(articleMap);
  if(articleMapKeys && articleMapKeys.length>0) {
    pageView.queryBatch(articleMapKeys, (result) => {
      if(result) {
        result.forEach(pv => {
          const attributes = pv.attributes;
          const key = attributes.key, views = attributes.views;
          const dom = articleMap[key];
          updateDOMCounter(dom, views);
        });
      }
    });
  }
}

function updateDOMCounter(item, views) {
  let str, flag=false;
  if(views>=1000000) {
    let num = (views/1000000).toFixed(2);
    str = `${num}Million+`;
    flag = true;
  } else if(views>=1000) {
    let num = (views/1000).toFixed(1);
    str = `${num}K+` ;
    flag = true;
  } else {
    str = `${views}`;
  }
  const numWrapper = item.querySelector('.views-num');
  numWrapper.innerHTML = str;
  if(window.popoverInit && flag) { // see popover.js
    item.setAttribute('data-one-toggle', 'popover');
    item.setAttribute('data-one-trigger', 'hover focus');
    item.setAttribute('data-one-content', views.toLocaleString());
    window.popoverInit([item]);
  }
}
