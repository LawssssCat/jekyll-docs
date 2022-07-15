const {Modal} = require('lib/modal');
const lazyload = require('lazyload');

lazyload.onload(() => {
  window.document.querySelectorAll('[data-toggle=modal]').forEach(toggle => {
    const triggerStr = toggle.getAttribute('data-modal-trigger') || 'click'; //  click | hover
    const triggerList = triggerStr.trim().split(/\s+/g);
    triggerList.forEach(trigger => {
      switch (trigger) {
        case 'hover':
          toggle.addEventListener('mouseenter', (e) => {
            if(!toggle.contains(e.fromElement)) {
              modal.show();
            }
          });
          break;
        case 'click':
        default:
          toggle.addEventListener('click', () => {
            modal.show();
          });
          break;
      }
    });
    const showCallbackStr = toggle.getAttribute('data-modal-showCallback');
    const hideCallbackStr = toggle.getAttribute('data-modal-hideCallback');
    const showCallbackStrFunc = showCallbackStr ? window[showCallbackStr] : null;
    const hideCallbackStrFunc = hideCallbackStr ? window[hideCallbackStr] : null;
    const modal = new Modal({
      showCallback: showCallbackStrFunc,
      hideCallback: hideCallbackStrFunc
    });
    modal.enableEventEscClose();
    modal.addEventListener('click', () => {
      modal.hide();
    });
  });
});
