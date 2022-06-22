// Determine whether the touch panel
var $root = document.getElementsByClassName('layout--base')[0];
if (window.TOOLBOX.hasEvent('touchstart')) {
  // $root.dataset.isTouch = true;
  $root.setAttribute('data-is-touch', true);
} else {
  $root.setAttribute('data-is-touch', false);
}
