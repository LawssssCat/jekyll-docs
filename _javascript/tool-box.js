const TOOL = {};

TOOL.hasEvent = function (event) {
  return 'on'.concat(event) in window.document;
};

// min <= r <= max
TOOL.randomInt = function (Min,Max) {
  var num = Min + Math.round(Math.random() * (Max - Min)); 
  return num;
};

// 
TOOL.generateId = function (prefix='generateId', suffix='', scope=window.document) {
  function randomInt() {
    return prefix + TOOL.randomInt(10000, 99999) + suffix;
  }
  let id;
  do {
    id = randomInt();
  } while (scope.getElementById(id));
  return id;
};

module.exports = TOOL;
