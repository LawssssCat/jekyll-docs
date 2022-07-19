const lazyload = require('lazyload');
const TOOL = require('tool-box');
const logger = require('logger');

lazyload.onload(() => {
  const articleContent = window.document.querySelector('.js-article-content');

  // 'h1[id], h2[id], ...'
  const selectors = [
    'h1[id]', 
    'h2[id]', 
    'h3[id]', 
    'h4[id]', 
    'h5[id]'
  ];
  const headings = articleContent.querySelectorAll(selectors.join(','));

  // anchor
  headings.forEach(dom => {
    const anchor = window.document.createElement('a');
    anchor.classList.add('anchor');
    anchor.classList.add('d-print-none');
    anchor.innerHTML = '#';
    dom.appendChild(anchor);
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      TOOL.historyPushHash(dom.id);
    });
  });

  // scroll
  const pageScrollTarget = window.VARIABLES.pageScrollTarget     || TOOL.throwError('undefined "pageScrollTarget"');
  const pageScroller     = window.VARIABLES.pageScroller         || TOOL.throwError('undefined "pageScroller"');

  const headingsTree = new HeadingsTree(headings);

  let func;
  pageScrollTarget.addEventListener('scroll', func = (e) => {
    logger.isDebug() && logger.debug('article.js', e);
    let handingDomActiveList;
    try {
      handingDomActiveList = updateArticleHandingDomActive(headings, headingsTree, pageScroller);
    } catch(error) {
      logger.error(error);
    }
    window.dispatchEvent(new CustomEvent('headingsActiveUpdate', {
      detail: handingDomActiveList
    }));
  });
  window.addEventListener('resize', func);
  window.addEventListener('load', func);
  window.addEventListener('require headingsActiveUpdate', func);

});

function updateArticleHandingDomActive(headingsDom, headingsDomTree, pageScroller) {
  const myScrollTop = pageScroller.scrollTop + pageScroller.clientHeight/2;
  let i, activeHeader=null;
  for(i=0; i<headingsDom.length; i++) {
    let currentHeader = headingsDom[i];
    const headingBottom = TOOL.positionRelative(currentHeader, pageScroller).top 
      + currentHeader.clientHeight;
    if(myScrollTop>headingBottom) {
      activeHeader = currentHeader;
    } else {
      break; // next
    }
  }

  // clear active
  headingsDom.forEach(dom => {
    dom.classList.remove('active');
  });
  // active
  const activeDom = [];
  if(activeHeader) {
    let activeNode = headingsDomTree.getNode(i-1);
    while(activeNode) {
      activeDom.push(activeNode.dom);
      activeNode.dom.classList.add('active');
      activeNode = headingsDomTree.getParent(activeNode);
    }
  }
  return activeDom;
}

function getHeadingDomlevel(headingDom) {
  // h1 => 1, h2 => 2 , ...
  const str = headingDom.tagName.slice(1);
  return parseInt(str);
}

class HeadingsTree {
  constructor(headings) {
    this.size = headings.length;
    this.root = {
      children: []
    };
    let curNode = this.root;
    this.nodeList = new Array(headings.length);
    headings.forEach((headingDom, index) => { 
      const node = this.nodeList[index] = {
        index: index,
        level: getHeadingDomlevel(headingDom),
        dom: headingDom,
        children: []
      };
      let ok = false;
      do {
        if(curNode==this.root) {
          node.parent = curNode;
          curNode.children.push(node);
          curNode = node;
          ok = true;
        } else if(curNode.level == node.level) {
          node.parent = curNode.parent;
          curNode.parent.children.push(node);
          curNode = node;
          ok = true;
        } else if(curNode.level < node.level) {
          node.parent = curNode;
          curNode.children.push(node);
          curNode = node;
          ok = true;
        } else {
          curNode = curNode.parent; // curNode.level --
        }
      } while(!ok);
    });
  }
  getNode(index) {
    return this.nodeList[index];
  }
  getParent(node) {
    return node.parent == this.root ? null : node.parent;
  }
}
