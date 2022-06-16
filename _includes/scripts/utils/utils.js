(
  window.hasEvent = function(event) {
    return 'on'.concat(event) in window.document;
  }
)();
