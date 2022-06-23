const TOOL_BOX = {};

TOOL_BOX.hasEvent = function (event) {
  return 'on'.concat(event) in window.document;
};

window.TOOL_BOX = TOOL_BOX;
