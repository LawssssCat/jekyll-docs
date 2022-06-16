(function() {
  var $root = document.getElementsByClassName('layout--base')[0];
  if (window.hasEvent('touchstart')) {
    // $root.dataset.isTouch = true;
    $root.setAttribute('data-is-touch', true);
  } else {
    $root.setAttribute('data-is-touch', false);
  }
})();
