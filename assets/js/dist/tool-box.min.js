(function() {
  const TOOLBOX = window.TOOLBOX = {};
  TOOLBOX.hasEvent = function(event) {
    return 'on'.concat(event) in window.document;
  };
})();
