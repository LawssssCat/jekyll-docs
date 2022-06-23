const {Set}  = require('./lib/set');

window.lazyLoad = (function(doc) {debugger
  function load(type, urls, callback) {
    let _urls = typeof urls == 'string' ? new Set([urls]) : new Set(urls);
  }
  return {
    js: function(url, callback) {
      load('js', url, callback);
    }, 
    css: function(url, callback) {
      load('css', url, callback);
    }
  };
})(this.document);
