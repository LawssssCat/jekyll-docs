
const {Stack} = require('lib/stack');
const TOOL = require('tool-box');
const logger = require('logger');

function getCurLevel(curNode, levels) { // 0,1,2,3...
  let curLevel = levels.findIndex((label) => {
    let flag = (curNode.tagName.toLowerCase() == label);
    return flag;
  });
  return curLevel;
}

/*
<ol>
  <li> <!-- h1 -->
    <a>h1</a>
    <ol>
      <li> <!-- h2 -->
        <a2>h2</a2>
      </li>
      <li> <!-- h2 -->
        <a2>h2</a2>
      </li>
      <li> <!-- h2 -->
        <a2>h2</a2>
      </li>
      <li> <!-- h2 -->
        <a2>h2</a2>
      </li>
    </ol>
  </li>
  <li> <!-- h1 -->
    <a>h1</a>
  </li>
  <li> <!-- h1 ! -->
    <ol>
      <li> <!-- h2 ! -->
        <ol>
          <li> <!-- h3 -->
            <a>h3</a>
          </li>
        </ol>
      </li>
    </ol>
  </li>
  <li> <!-- h1 ! -->
    <ol>
      <li> <!-- h2 -->
        <a2>h2</a2>
      </li>
      <li> <!-- h2 -->
        <a2>h2</a2>
      </li>
      <li> <!-- h2 -->
        <a2>h2</a2>
      </li>
      <li> <!-- h2 -->
        <a2>h2</a2>
      </li>
    </ol>
  </li>
</ol>
*/
function generateTocDOM(headers, headersLevel, topLevel) {
  const tag = 'ol', tocDom = document.createElement(tag), // result
    // stack
    stackDOM = new Stack([tocDom]), 
    headersDOMlist = []; // save for later use

  // create header dom one by one
  let index=0, preLevel=topLevel;
  while(index < headers.length) {
    let preDOM=stackDOM.last(), curLevel=headersLevel[index];
    if(preLevel<curLevel) // go deeper
    {
      const li=document.createElement('li'), ol=document.createElement(tag);
      li.appendChild(ol);
      preDOM.appendChild(li);
      preLevel++;
      stackDOM.push(ol);
    } 
    else if(preLevel>curLevel) // too deep
    {
      preLevel--;
      stackDOM.pop();
    } 
    else // preLevel==curLevel
    {
      if(preDOM.tagName.toLowerCase() != tag) { // a => ol
        const ol=document.createElement(tag);
        preDOM.appendChild(ol);
        preDOM = ol;
        stackDOM.pop();
        stackDOM.push(ol);
      }
      const header=headers[index], li=document.createElement('li'), a=document.createElement('a');
      a.href = `#${header.id}`;
      a.textContent = header.textContent;
      li.appendChild(a);
      li.classList.add(`toc-h${curLevel+1}`);
      preDOM.appendChild(li); // top is 'li' not 'ol'
      preLevel++;
      stackDOM.push(li);
      index++;
      headersDOMlist.push(li); // save for later use
    }
  }
  return {
    tocDom,
    headersDOMlist
  };
}

class Toc {
  constructor(options={}) {
    this.config = {};
    this.config.contentSelector    = options.contentSelector       || '.js-article-content';
    this.config.tocSelector        = options.tocSelector           || '.js-toc-root';
    this.config.headerSelectors    = options.headerSelectors       || 'h1,h2,h3';
    this.config.headerIgnoreAttr   = options.headerIgnoreAttr      || 'toc-header-ignore';
  }
  init() {
    // assamble
    this.toc     = window.document.querySelector(this.config.tocSelector)      || TOOL.throwError(`can't find ${this.config.tocSelector}`);
    this.content = window.document.querySelector(this.config.contentSelector)  || TOOL.throwError(`can't find ${this.config.contentSelector}`);
    this.levels = this.config.headerSelectors.trim().split(/\s*,\s*/g);
    this.headers = Array.from(this.content.querySelectorAll(this.config.headerSelectors)).filter((header) => {
      // has id
      const id = header.getAttribute('id');
      // no ignore flag
      const flagIgnore = header.hasAttribute(this.config.headerIgnoreAttr);
      return id!=null && !flagIgnore;
    });
    if(this.headers.length==0) {
      logger.info('toc', (this.toc.innerHTML = 'no headings...'));
      return;
    }

    // level
    this.headersLevel = this.headers.map(header => {
      return getCurLevel(header, this.levels);
    }); 
    this.topLevel = Math.min(...this.headersLevel); // save for later use

    // rander
    this.rander();

    // listener
    let updateTocFlag = false;
    window.addEventListener('headingsActiveUpdate', (e) => { // sevent customEvent "headingsActiveUpdate"
      logger.isDebug() && logger.debug('toc.js', e);
      const handingDomActiveList = e.detail;
      this.updateToc(handingDomActiveList);
      updateTocFlag = true;
    });
    let intervalId = setInterval(() => {
      if(!updateTocFlag) {
        window.dispatchEvent(new Event('require headingsActiveUpdate'));
      } else {
        if(intervalId) {
          clearInterval(intervalId);
        }
      }
    }, 100);
    
  }
  rander() {
    const {tocDom, headersDOMlist} = generateTocDOM(this.headers, this.headersLevel, this.topLevel);
    this.headersDOMlist = headersDOMlist;
    this.headersDOMlist.forEach(dom => {
      const a = dom.querySelector('a');
      if(a) {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          const href = a.getAttribute('href');
          TOOL.historyPushHash(href);
        });
      }
    });
    this.toc.appendChild(tocDom);
  }
  updateToc(handingDomActiveList) {
    // if(this.disable()) return; // if no header or display=none, don't update // 2022-07-03 if toc disable, return directly on init.
    this.updateActive(handingDomActiveList);
    this.updateTocScroll();
  }
  updateTocScroll() { // if toc overflow, top active header at the top of toc scroll
    if(TOOL.isOverflowY(this.toc)) {
      const activeList = this.headersDOMlist.filter(dom => {
        return dom.classList.contains(this.activeClass);
      });
      if(activeList && activeList.length>0) {
        let topActive, lowestActive, topTop, lowestTop;
        if(activeList.length==1) {
          topActive=lowestActive=activeList[0];
          topTop=lowestTop=TOOL.positionRelative(topActive, this.toc).top;
        } else {
          topActive             =activeList[0];
          lowestActive          =activeList[activeList.length-1];
          topTop                =TOOL.positionRelative(topActive, this.toc).top;
          lowestTop             =TOOL.positionRelative(lowestActive, this.toc).top;
        }
        const scrollHeight=this.toc.clientHeight, activeHeight=(lowestTop-topTop);
        let scrollTop;
        if(scrollHeight>activeHeight) {
          scrollTop = topTop;
        } else {
          scrollTop = (lowestTop-scrollHeight);
        }
        this.toc.scroll({
          top: scrollTop,
          behavior: 'smooth'
        });
      }
    }
  }
  updateActive(handingDomActiveList) {
    const selector = handingDomActiveList.map(headingDom => {
      return `a[href="#${headingDom.id}"]`;
    }).join(',');
    this.headersDOMlist.forEach(dom => {
      dom.classList.remove('active');
    });
    this.headersDOMlist.filter(dom => {
      return dom.querySelectorAll(selector).length > 0;
    }).forEach(dom => {
      dom.classList.add('active');
    });
  }
}

module.exports = {
  Toc
};
