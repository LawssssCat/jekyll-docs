const {Set}  = require('./lib/set');

const lazyLoad = (function(doc) {
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
})(document);

module.exports = {
  lazyLoad
};
