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

TOOL.isOverflowX = function(dom) {
  return dom.offsetWidth < dom.scrollWidth;
};

TOOL.isHidden = function(element) {
  // var style = window.getComputedStyle(el);//el即DOM元素
  // return (style.display === 'none');
  return (!element)
    || (TOOL.getStyle(element, 'display') == 'none')
    || (element.offsetHeight === 0 && element.offsetWidth === 0);
};

TOOL.getStyle = function(obj, attr) {
  if (obj.currentStyle) { // compatible IE
    return obj.currentStyle[attr];
  } else if (window.getComputedStyle) {
    return window.getComputedStyle(obj, null)[attr];
  } else {
    return obj.style[attr];
  }
};

function px2Float(px) {
  if(!px) return 0;
  const intStr=px.replace('px');
  const float=parseFloat(intStr);
  return float?float:0;
}

TOOL.innerWidth = function(dom) {
  if(!dom) return 0;
  const flag = (TOOL.getStyle(dom, 'display') == 'none');
  if(flag) {
    dom = dom.cloneNode(true);
    dom.style.position = 'absolute';
    dom.style.top = '-3000px';
    dom.style.display = 'block';
    document.getElementsByTagName('body')[0].appendChild(dom);
  }
  const paddingLeft      =px2Float(TOOL.getStyle(dom, 'paddingLeft')),
    innerWidth           =px2Float(TOOL.getStyle(dom, 'width')),
    paddingRight         =px2Float(TOOL.getStyle(dom, 'paddingRight'));
  if(flag) {
    dom.parentNode.removeChild(dom);
  }
  return -paddingLeft+innerWidth-paddingRight;
};

TOOL.outterWidth = function(dom) {
  if(!dom) return 0;
  const marginLeft     =px2Float(TOOL.getStyle(dom, 'marginLeft')),
    marginRight        =px2Float(TOOL.getStyle(dom, 'marginRight')),
    innerWidth         =TOOL.innerWidth(dom);
  return marginLeft+innerWidth+marginRight;
};

/*
| ---------------- dom ------------------ |
| --- child 1--- | ---- child 2----- | 
return (child 1 outter width) + (child 2 outter width)

| ---------------- dom ------------------ |
| --- child 1--- | ---- child 2----- | ---- child 3 ---- |
return dom inner width
*/
TOOL.childTotalWidth = function(dom) {
  if(!dom) return 0;
  const innerWidth = TOOL.innerWidth(dom),
    childTotalWidth = Array.from(dom.childNodes).reduce((sum, child) => {
      let width = TOOL.outterWidth(child);
      return width ? width + sum : sum;
    }, 0);
  return innerWidth>childTotalWidth ? childTotalWidth : innerWidth;
};

module.exports = TOOL;
