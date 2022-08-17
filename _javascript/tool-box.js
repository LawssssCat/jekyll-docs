const {Prompt} = require('lib/prompt');

const TOOL = {};

TOOL.throwError = function(msg) {
  throw new Error(msg);
};

TOOL.hasEvent = function (event) {
  return 'on'.concat(event) in window.document;
};

function formatHash(hash) {
  if(!hash) {
    hash = '';
  }
  if(!hash.startsWith('#')) {
    hash = '#' + hash;
  }
  return hash;
}

TOOL.historyReplaceHash = function (hash) {
  history.replaceState(null, '', formatHash(hash));
};

TOOL.historyPushHash = function (hash) {
  history.pushState(null, '', formatHash(hash));
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

/**
 * position diff with two dom (dom and container)
 * 
 * | ------------ container -------------- |
 * | <------ left -------> | ---- dom ---- | 
 * 
 * ------------------- container
 * ↑
 * | top
 * ↓
 * ------------------- dom
 * 
 * return (top, left)
 */
TOOL.positionRelative = function(dom, container=document.body) {
  const p1 = TOOL.position(dom), p2 = TOOL.position(container);
  return {
    top: (p1.top - p2.top), 
    left: (p1.left - p2.left)
  };
};

TOOL.unlockScroll = function(dom) {
  const container = dom || window.document.body;
  if(container.isLockScroll) {
    container.style.overflowY = '';
    container.style.marginRight = '';
  }
  container.isLockScroll = false;
};

TOOL.lockScroll = function(dom) {
  const container = dom || window.document.body;
  if(!container.isLockScroll) {
    if(TOOL.isOverflowY(container)) {
      container.style.overflowY = 'hidden';
      container.style.marginRight = '16px';
    } else {
      container.style.overflowY = 'hidden';
    }
  }
  container.isLockScroll = true;
};

TOOL.isOverflowY = function(dom) {
  if(document.body == dom) {
    return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
  }
  return dom.offsetHeight < dom.scrollHeight;
};

TOOL.isOverflowX = function(dom) {
  return dom.offsetWidth < dom.scrollWidth;
};

TOOL.isHidden = function(element) {
  // var style = window.getComputedStyle(el);//el即DOM元素
  // return (style.display === 'none');
  return (!element)
    || (TOOL.getStyle(element)['display'] == 'none')
    || (element.offsetHeight === 0 && element.offsetWidth === 0);
};

TOOL.getStyle = function(obj) {
  let style;
  if (obj.currentStyle) { // compatible IE
    style = obj.currentStyle;
  } else if (window.getComputedStyle) {
    style = window.getComputedStyle(obj, null);
  } else {
    style = obj.style;
  }
  return style;
};

function px2Float(px) {
  if(!px) return 0;
  const intStr=px.replace('px');
  const float=parseFloat(intStr);
  return float?float:0;
}

function cloneDisplayNone(dom, callback) {
  const flag = (TOOL.getStyle(dom)['display'] == 'none');
  if(!flag) {
    return callback(dom);
  } else {
    const rawVisibility = dom.style.visibility;
    const rawDisplay = dom.style.display;
    dom.style.visibility = 'hidden';
    dom.style.display = 'block';
    const result = callback(dom);
    dom.style.visibility = rawVisibility;
    dom.style.display = rawDisplay;
    return result;
  }
}

TOOL.height = function(dom) {
  if(!dom) return 0;
  return cloneDisplayNone(dom, (dom) => {
    const style = TOOL.getStyle(dom);
    const  innerHeight           =px2Float(style['height']);
    return innerHeight;
  });
};

/**
 * content
 * return content
 */
TOOL.innerWidth = function(dom) {
  if(!dom) return 0;
  return cloneDisplayNone(dom, (dom) => {
    const style = TOOL.getStyle(dom);
    const paddingLeft      =px2Float(style['paddingLeft']),
      innerWidth           =px2Float(style['width']),
      paddingRight         =px2Float(style['paddingRight']);
    return -paddingLeft+innerWidth-paddingRight;
  });
};

/**
 * padding + content + padding
 * return content
 */
TOOL.width = function(dom) {
  if(!dom) return 0;
  return cloneDisplayNone(dom, (dom) => {
    const style = TOOL.getStyle(dom);
    const innerWidth           =px2Float(style['width']);
    return innerWidth;
  });
};

/**
 * return margin + padding + content + padding + margin
 */
TOOL.outterWidth = function(dom) {
  if(!dom) return 0;
  return cloneDisplayNone(dom, (dom) => {
    const style = TOOL.getStyle(dom);
    const marginLeft     =px2Float(style['marginLeft']),
      marginRight        =px2Float(style['marginRight']),
      innerWidth         =TOOL.innerWidth(dom);
    return marginLeft+innerWidth+marginRight;
  });
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

// Start observing visbility of element. On change, the
//   the callback is called with Boolean visibility as
//   argument:
// 
// see: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// demo: https://jsfiddle.net/elmarj/u35tez5n/5
TOOL.respondToVisibility = function(element, callback, options) {
  // eslint-disable-next-line no-unused-vars
  var observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      callback(entry.intersectionRatio > 0);
    });
  }, options);

  observer.observe(element);
};

TOOL.copyTextToClipboard = function(text) {
  if(navigator && navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  } else {
    return new Promise((resolve, reject) => {
      const textArea = document.createElement('textarea');

      //
      // *** This styling is an extra step which is likely not required. ***
      //
      // Why is it here? To ensure:
      // 1. the element is able to have focus and selection.
      // 2. if the element was to flash render it has minimal visual impact.
      // 3. less flakyness with selection and copying which **might** occur if
      //    the textarea element is not visible.
      //
      // The likelihood is the element won't even render, not even a
      // flash, so some of these are just precautions. However in
      // Internet Explorer the element is visible whilst the popup
      // box asking the user for permission for the web page to
      // copy to the clipboard.
      //
    
      // Place in the top-left corner of screen regardless of scroll position.
      textArea.style.position = 'fixed';
      textArea.style.top = 0;
      textArea.style.left = 0;
    
      // Ensure it has a small width and height. Setting to 1px / 1em
      // doesn't work as this gives a negative w/h on some browsers.
      textArea.style.width = '2em';
      textArea.style.height = '2em';
    
      // We don't need padding, reducing the size if it does flash render.
      textArea.style.padding = 0;
    
      // Clean up any borders.
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
    
      // Avoid flash of the white box if rendered for any reason.
      textArea.style.background = 'transparent';
    
      textArea.value = text;
    
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand('copy');
      } catch (err) {
        reject(err);
      }
    
      document.body.removeChild(textArea);
      resolve();
    });
  }
};

/**
 * options.delay: setTimeout to remove this prompt.(unit: ms)
 * (-1=don't remove auto)
 */
TOOL.prompt = function (text, options={}) {
  const delay     = options.delay     || 1000;
  const prompt = new Prompt({
    position: options.position // bottom, middle, top
  });
  prompt.text = text;
  prompt.show();
  if(delay != -1) {
    setTimeout(() => {
      prompt.remove();
    }, delay);
  }
  return prompt;
};

/**
 * https://www.cnblogs.com/caizhenbo/p/6679478.html
 */
TOOL.ready = function(fn){

  if(document.addEventListener) {
    let func;
    document.addEventListener('DOMContentLoaded', func = function() {
      document.removeEventListener('DOMContentLoaded',func, false);
      fn();
    }, false);
  } 

  // 如果IE
  else if(document.attachEvent) {
    let func;
    // 确保当页面是在iframe中加载时，事件依旧会被安全触发
    document.attachEvent('onreadystatechange', func = function() {
      if(document.readyState == 'complete') {
        document.detachEvent('onreadystatechange', func);
        fn();
      }
    });

    // 如果是IE且页面不在iframe中时，轮询调用doScroll 方法检测DOM是否加载完毕
    if(document.documentElement.doScroll && typeof window.frameElement === 'undefined') {
      try{
        document.documentElement.doScroll('left');
      } catch(error) {
        return setTimeout(func, 20);
      }
      fn();
    }
  }
};

module.exports = window.TOOL = TOOL;
