const {Popper} = require('lib/popper');
const lazyload = require('lazyload');
const sources = window.VARIABLES.sources;

lazyload.js([sources.popper.js], function() {
  document.querySelectorAll('[data-toggle=popover]').forEach(toggle => {
    const content         = toggle.getAttribute('data-popper-content');
    const title           = toggle.getAttribute('data-popper-title');
    const triggerStr      = toggle.getAttribute('data-popper-trigger') || 'click'; //  click | hover | focus
    const triggerEvents   = triggerStr.split(/\s+/).filter(str => str!='');
    const placement       = toggle.getAttribute('data-popper-placement');
    const popper = new Popper({
      popperConfigPlacement: placement || 'bottom',
      popperConfigModifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8]
          }
        }
      ],
      toggle: toggle,
      toggleEvents: triggerEvents,
      title: title,
      content: content,
      showCallback: () => {
        toggle.setAttribute('aria-describedby', popper.id);
      },
      hideCallback: () => {
        toggle.removeAttribute('aria-describedby');
      }
    });
    popper.init();
  });
});
