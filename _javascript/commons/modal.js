const {Modal} = require('lib/modal');
const lazyload = require('lazyload');
const logger = require('logger');

lazyload.onload(() => {
  window.document.querySelectorAll('[data-toggle=modal]').forEach(toggle => {
    const triggerStr = toggle.getAttribute('data-modal-trigger') || 'click'; //  click | hover
    const triggerList = triggerStr.trim().split(/\s+/g);
    triggerList.forEach(trigger => {
      switch (trigger) {
        case 'hover': {
          let hoverFunc, hoverFuncOptions={passive: true};
          toggle.addEventListener('mouseenter', hoverFunc = (e) => {
            logger.isDebug() && logger.debug(e);
            if(!toggle.contains(e.fromElement)) {
              modal.show();
            }
          }, hoverFuncOptions);
          toggle.addEventListener('touchstart', hoverFunc, hoverFuncOptions);
          break;
        }
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
