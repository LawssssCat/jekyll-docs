const TOOL = require('tool-box');

// Determine whether the touch panel
let $root = document.getElementsByClassName('layout--base')[0];
if (TOOL.hasEvent('touchstart')) {
  // $root.dataset.isTouch = true;
  $root.setAttribute('data-is-touch', true);
} else {
  $root.setAttribute('data-is-touch', false);
}
