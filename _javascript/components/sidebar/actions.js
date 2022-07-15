const lazyload = require('lazyload');
const {Modal} = require('lib/modal');

lazyload.onload(() => {
  const rootSelector='.js-page-root', toggleSelector='.js-sidebar-show';
  const addClass='show-sidebar';
  const root    =window.document.querySelector(rootSelector);
  const toggle  =window.document.querySelector(toggleSelector);
  const modal   =new Modal({
    showCallback: () => {
      root.classList.add(addClass);
    },
    hideCallback: () => {
      root.classList.remove(addClass);
    }
  });
  toggle.addEventListener('click', () => {
    modal.show();
  });
  modal.addEventListener('click', () => {
    modal.hide();
  });
  modal.enableEventEscClose();
});
