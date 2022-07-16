const TOOL = require('tool-box');

function runFunction(func, caller, ...args) {
  try{
    func && func.call(caller, ...args);
    TOOL.logger.isDebug() && TOOL.logger.debug('caller', caller, '\n', 'func', func, 'args', args);
  } catch (err) {
    TOOL.logger.error('caller', caller, '\n', 'func', func, 'args', args, '\n', err); // prompt the console for errors and continue with the next task.
  }
}

function createNode(name, attrs) {
  const node = window.document.createElement(name);
  for(const [key, value] of Object.entries(attrs)) {
    node.setAttribute(key, value);
  }
  return node;
}

class LazyLoad {
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
    this.requireQueue = [];
  }
  checkRequireQueue() {
    const context = this;
    context.requireQueue.forEach((item, index) => {
      const urls=item.urls, callback=item.callback;
      let loadedAll = urls.every(url => {
        return context.requireLoadedStatusMap[url] == true;
      });
      if(loadedAll) {
        context.requireQueue.splice(index, 1);
        runFunction(callback, context);
      }
    });
  }
  load(requireList, callback) {
    const context = this;
    // filter & init
    const unloadList = requireList.filter(item => {
      const url = item.url;
      let requireLoadStatus = context.requireLoadedStatusMap[url];
      if(requireLoadStatus==true) {
        return false;
      }
      return  true;
    });
    // run (directly)
    if(!unloadList || unloadList.length==0) {
      runFunction(callback, context);
    }
    context.requireQueue.push({
      urls: unloadList.map((item) => item.url),
      callback: callback
    });
    // load
    unloadList.forEach(item => {
      const type=item.type, url=item.url;
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
        context.requireLoadedStatusMap[url] = true; // url loaded flag
        context.checkRequireQueue(); // trigger callback that dependencies had loaded
      };
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
  onload(callback) {
    const context = this;
    if(!context.onloadStatus) {
      context.onloadStatus = {
        init: false,
        windowLoad: false,
        windowLoadArgs: null,
        queueCallback: []
      };
    }
    // push
    context.onloadStatus.queueCallback.push(callback);
    // init
    if(context.onloadStatus.init == false) {
      context.onloadStatus.init = true;
      window.addEventListener('load', (...args) => {
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

module.exports = new LazyLoad();
