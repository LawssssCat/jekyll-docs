const lazyload = require('lazyload');
const sources = window.VARIABLES.sources;

lazyload.js([sources.gitalk.js], function() {
  console.log('hello world');
});
