const lazyload = require('lazyload');
const logger = require('logger');
const themes = window.VARIABLES.themes;

lazyload.onload(() => {
  /* var test = window.matchMedia('(prefers-color-scheme: dark)'); */
  let theme = window.localStorage.getItem('theme');
  let index = themes.indexOf(theme);
  if(index < 0) {
    index = 0;
  }
  function updateTheme(_index) {
    let flag = themes[_index];
    logger.isDebug() && logger.debug('theme.js', flag);
    window.document.documentElement.setAttribute('data-theme', flag);
    window.localStorage.setItem('theme', flag);
  }
  function increaseIndex(_index) {
    _index++;
    if(_index>=themes.length) {
      _index=0;
    }
    return _index;
  }
  updateTheme(index);
  window.document.querySelectorAll('.toggle-theme-switch').forEach(dom => {
    dom.addEventListener('click', function() {
      index = increaseIndex(index);
      updateTheme(index);
    });
  });
}, {
  priority: -1
});
