const lazyload = require('lazyload');
const toc = window.VARIABLES.toc.selectors;

lazyload.onload(() => {
  console.log(toc);
});
