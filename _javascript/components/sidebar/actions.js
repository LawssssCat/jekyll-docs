const lazyload = require('lazyload');

lazyload.onload(() => {
  const rootSelector='.js-page-root', toggleSelector='.js-sidebar-show', maskSelector='.js-page-mask';
  const addClass='show-sidebar';
  const root    =window.document.querySelector(rootSelector);
  const toggle  =window.document.querySelector(toggleSelector);
  const mask  =window.document.querySelector(maskSelector);
  toggle.addEventListener('click', () => {
    if(root.classList.contains(addClass)) {
      root.classList.remove(addClass);
    } else {
      root.classList.add(addClass);
    }
  });
  mask.addEventListener('click', () => {
    root.classList.remove(addClass);
  })
});
