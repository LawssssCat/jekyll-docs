const tools = require('tool-box');
const lazyload = require('lazyload');
const sources = window.VARIABLES.sources;

lazyload.js([sources.leancloud_sdk.js], function() {

  if(!window.AV) throw new Error('needs AV obj from leancloud_sdk.js');
  
  const { appId, appKey, appClass, layout } = window.VARIABLES.paveview;
  const { Pageview } = require('lib/leancloud');
  const pageView = new Pageview(window.AV, {
    appId:     appId,
    appKey:    appKey,
    appClass:  appClass
  });
  switch (layout) {
    case 'article':
      actions4Artical(pageView);
      break;
    default:
      throw new Error(`error layout ${layout}`);
  }

});

function actions4Artical(pageView) {
  window.document.querySelectorAll('.js-pageview').forEach(item => {
    const key = item.getAttribute('data-one-page-key');
    const title = item.getAttribute('data-one-page-title');
    
    // increment and render views num
    pageView.increase(key, title, (views) => {
      let str;
      if(views>=1000000) {
        let num = (views/1000000).toFixed(2);
        str = `${num}Million+`;
      } else if(views>=1000) {
        let num = (views/1000).toFixed(1);
        str = `${num}K+` ;
      } else {
        str = `${views}`;
      }
      const numWrapper = item.querySelector('.views-num');
      numWrapper.innerHTML = str;
    });
  });
}
