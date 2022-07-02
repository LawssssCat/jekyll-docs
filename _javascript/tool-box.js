const TOOL = {};

TOOL.hasEvent = function (event) {
  return 'on'.concat(event) in window.document;
};

TOOL.historyReplaceHash = function (hash) {
  const split = window.location.href.split('?');
  let baseUrl = split[0].split('#')[0], query = split.length>1?split[1]:'';
  let href=baseUrl;
  if(hash) {
    hash = hash.replace('#', '');
    href = `${href}#${hash}`;
  }
  if(query) {
    href = `${href}?${query}`;
  }
  history.replaceState(null, '', href);
};

// min <= r <= max
TOOL.randomInt = function (Min,Max) {
  var num = Min + Math.round(Math.random() * (Max - Min)); 
  return num;
};

// generate non deplicate DOM id
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

// relative to document/html/body
TOOL.position = function(dom) {
  let top = dom.offsetTop;
  let left = dom.offsetLeft;
  var current = dom.offsetParent;
  while (current !== null) {
    top += current.offsetTop;
    left += current.offsetLeft;
    current = current.offsetParent;
  }
  return {
    top,
    left
  };
};

TOOL.positionRelative = function(dom, container=document.body) {
  const p1 = TOOL.position(dom), p2 = TOOL.position(container);
  return {
    top: (p1.top - p2.top), 
    left: (p1.left - p2.left)
  };
};

TOOL.isOverflowY = function(dom) {
  return dom.offsetHeight < dom.scrollHeight;
};

module.exports = TOOL;
