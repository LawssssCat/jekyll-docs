const {Set}  = require('lib/set');

const lazyLoad = (function(doc) {
  const 
    queue   = {js: [], css: []}, // load urls queue
    sources = {js: {}, css: {}}, // load url status
    context=this;

  function createNode(name, attrs) {
    const node = doc.createElement(name);
    for(const [key, value] of Object.entries(attrs)) {
      node.setAttribute(key, value);
    }
    return node;
  }

  function callbacksTrigger(type, url) {
    let q = queue[type], s = sources[type];
    let unloadQ = q.filter(item => {
      return item.load == false;
    });
    unloadQ.forEach(item => {
      if(item.urls.has(url)) {
        let flag = item.urls.values().every(url => { // check if all url of this item had load 
          return s[url] == true;
        });
        if(flag == true) {
          item.load = true;
          item.callbacks.forEach(callback => {       // trigger callbacks of item one by one, which have just been loaded
            callback.call(context);
          });
        }
      }
    });
  }

  function load(type, urls, callback) {
    if( type!='js' && type!='css' ) {
      throw new Error(`error type ${type} with urls ${urls}`);
    }

    let _urls = typeof urls == 'string' ? new Set([urls]) : new Set(urls);

    let q = queue[type], s = sources[type], qRecord;
    qRecord = q.find(qCur => {
      return _urls.is(qCur.urls);
    });

    if(qRecord) { // queue record exists
      if(callback) return;
      if(qRecord.load == true) {      // dependencies had loaded.  ==> run callback directly
        callback.call(context);
      } else {                        // dependencies are loading. ==> run callback after loading
        qRecord.callbacks.push(callback);
      }
    } else {
      q.push({   // create queue record
        urls: _urls,
        callbacks: callback ? [callback] : [],
        load: false
      });
      let unloadUrls = _urls.values().filter(url => { // filter out urls that are not loaded
        return s[url] == undefined;
      });
      let node;
      unloadUrls.forEach(url => { // load url one by one
        s[url] = false;  // url unload flag
        (type == 'js') && (node = createNode('script', {src: url}));
        (type == 'css') && (node = createNode('link', {href: url, rel: 'stylesheet'}));
        node.onload = () => {
          s[url] = true; // url loaded flag
          callbacksTrigger(type, url); // trigger callback that dependencies had loaded
        };
        (doc.head || doc.body).appendChild(node);
      });
    }
  } // end func 'load'

  return {
    js: function(url, callback) {
      load('js', url, callback);
    }, 
    css: function(url, callback) {
      load('css', url, callback);
    }
  };
})(window.document);

module.exports = lazyLoad;
