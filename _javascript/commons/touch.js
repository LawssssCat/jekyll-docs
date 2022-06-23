// Determine whether the touch panel
let $root = document.getElementsByClassName('layout--base')[0];
if (window.TOOL_BOX.hasEvent('touchstart')) {
  // $root.dataset.isTouch = true;
  $root.setAttribute('data-is-touch', true);
} else {
  $root.setAttribute('data-is-touch', false);
}
