const logger = require('logger');
const { Queue } = require('lib/queue');

function runFunction(func, caller, ...args) {
  try{
    func && func.call(caller, ...args);
    logger.isDebug() && logger.debug('caller', caller, '\n', 'func', func, 'args', args);
  } catch (err) {
    logger.error('caller', caller, '\n', 'func', func, 'args', args, '\n', err); // prompt the console for errors and continue with the next task.
  }
}

function createNode(name, attrs) {
  const node = window.document.createElement(name);
  for(const [key, value] of Object.entries(attrs)) {
    node.setAttribute(key, value);
  }
  return node;
}

class RequireLoad {
  constructor() {
    /**
     * key: url (string)
     * value: loadStatus (boolean)
     */
    this.requireLoadedStatusMap = {};
    /**
     * [
     *   {
     *    urls: [...]
     *    callback: function
     *   }, 
     *  ...
     * ]
     */
    this.requireQueue = new Queue();
  }
  checkRequireQueue() {
    const context = this;
    const queueSize = context.requireQueue.size;
    for(let i=0; i<queueSize; i++) {
      const item = context.requireQueue.dequeue();
      const urls=item.urls, callback=item.callback;
      let loadedAll = urls.every(url => {
        let requireLoadStatus = context.requireLoadedStatusMap[url];
        return requireLoadStatus && requireLoadStatus.loaded == true;
      });
      if(loadedAll) {
        runFunction(callback, context);
      } else {
        context.requireQueue.enqueue(item);
      }
    }
  }
  load(requireList, callback) {
    const context = this;
    // filter & init
    const unloadList = requireList.filter(item => {
      let requireLoadStatus = context.requireLoadedStatusMap[item.url];
      return !requireLoadStatus || requireLoadStatus.loaded == false;
    });
    // run (directly)
    if(!unloadList || unloadList.length==0) {
      runFunction(callback, context);
    }
    context.requireQueue.enqueue({
      urls: unloadList.map((item) => item.url),
      callback: callback
    });
    // load
    unloadList.forEach(item => {
      const url=item.url;
      let requireLoadStatus = context.requireLoadedStatusMap[url];
      if(!requireLoadStatus) {
        // create (unloaded) status
        context.requireLoadedStatusMap[url] = {
          loaded: false
        };
        // create require node
        const type=item.type;
        let node;
        switch (type) {
          case 'css':
            node = createNode('link', {href: url, rel: 'stylesheet'});
            break;
          case 'js':
            node = createNode('script', {src: url});
            break;
          default:
            throw new Error(`unknow type:${type}`);
        }
        (window.document.head || window.document.body).appendChild(node);
        node.onload = () => {
          context.requireLoadedStatusMap[url].loaded = true; // url loaded flag
          context.checkRequireQueue(); // trigger callback that dependencies had loaded
        };
      }
    });
  }
  css(urls, callback) {
    this.load(urls.map(url => {
      return {
        type: 'css',
        url: url
      };
    }), callback);
  }
  js(urls, callback) {
    this.load(urls.map(url => {
      return {
        type: 'js',
        url: url
      };
    }), callback);
  }
}

class WindowLoad {
  constructor() {
    this.onloadStatus = {
      init: false,
      windowLoad: false,
      windowLoadArgs: null,
      queueCallback: []
    };
  }
  onload(callback) {
    const context = this;
    // push
    context.onloadStatus.queueCallback.push(callback);
    // init
    if(context.onloadStatus.init == false) {
      context.onloadStatus.init = true;
      // improvement: listen 'DOMContentLoaded' instead of 'load'
      // doc zhihu https://zhuanlan.zhihu.com/p/25876048
      // doc w3c https://html.spec.whatwg.org/multipage/parsing.html#parsing
      // doc mdn https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
      // demo https://testdrive-archive.azurewebsites.net/HTML5/DOMContentLoaded/Default.html
      window.addEventListener('DOMContentLoaded', (...args) => {
        context.onloadStatus.windowLoad = true;
        context.onloadStatus.windowLoadArgs = args;
        // callback
        context.onloadStatus.queueCallback.forEach(callback => {
          runFunction(callback, context, ...args);
        });
      });
    }
    // callback (directly)
    if(context.onloadStatus.windowLoad == true) {
      runFunction(callback, context, context.onloadStatus.windowLoadArgs);
    }
  }
}

const requireLoad = new RequireLoad();
const windowLoad = new WindowLoad();

module.exports = 
{
  onload: (...args) => {
    windowLoad.onload(...args);
  },
  js: (...args) => {
    requireLoad.js(...args);
  },
  css: (...args) => {
    requireLoad.css(...args);
  }
};
