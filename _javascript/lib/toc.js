
const {Stack} = require('lib/stack');
const TOOL = require('tool-box');

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
function generateDOM(headers, levels) {
  const tag = 'ol', result = document.createElement(tag), // result
    // pretreatment
    headersLevel = headers.map(header => {
      return getCurLevel(header, levels);
    }), 
    topLevel = Math.min.apply(Math, headersLevel),
    // stack
    stackDOM = new Stack([result]), 
    headersDOMlist = []; // save for later use

  if(this) {
    this.headersLevel = headersLevel; this.topLevel = topLevel; // save for later use
    this.headersDOMlist = headersDOMlist;
  }

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
  return result;
}

class Toc {
  constructor(options={}) {
    this.config = {};
    this.config.contentSelector    = options.contentSelector       || '.js-article-content';
    this.config.tocSelector        = options.tocSelector           || '.js-toc-root';
    this.config.headerSelectors    = options.headerSelectors       || 'h1,h2,h3';
    this.config.headerIgnoreAttr   = options.headerIgnoreAttr      || 'toc-header-ignore';
    this.config.scrollTarget       = options.scrollTarget          || window;
    this.config.scroller           = options.scroller              || (window.document.scrollingElement || window.document.documentElement || window.document.body);
  }
  init() {
    // assamble
    this.toc     = window.document.querySelector(this.config.tocSelector);
    this.content = window.document.querySelector(this.config.contentSelector);
    if(!this.content) throw new Error(`toc can't find content with selector ${this.config.contentSelector}`);
    if(!this.toc)     throw new Error(`toc can't find toc with selector ${this.config.tocSelector}`);
    this.levels = this.config.headerSelectors.trim().split(/\s*,\s*/g);
    this.headers = Array.from(this.content.querySelectorAll(this.config.headerSelectors)).filter((header) => {
      // has id
      const id = header.getAttribute('id');
      // no ignore flag
      const flagIgnore = header.hasAttribute(this.config.headerIgnoreAttr);
      return id!=null && !flagIgnore;
    });
    // scroll
    this.activeClass = 'active';
    this.scrollTarget = typeof this.config.scrollTarget == 'string' ? window.document.querySelector(this.config.scrollTarget) : this.config.scrollTarget;
    this.scroller = typeof this.config.scroller == 'string' ? window.document.querySelector(this.config.scroller) : this.config.scroller;

    // rander
    this.rander();
    this.updateToc();

    // listener
    this.scrollTarget.addEventListener('scroll', () => {
      this.updateToc();
    });
    window.addEventListener('resize', () => {
      this.updateToc();
    });
    this.headersDOMlist.forEach(dom => {
      const a = dom.querySelector('a');
      if(a) {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          const href = a.getAttribute('href');
          const offsetTop = document.querySelector(href).offsetTop;

          this.scrollTarget.scroll({
            top: offsetTop,
            behavior: 'smooth'
          });
        });
      }
    });
  }
  disable() {
    return TOOL.isHidden(this.toc)
      || (this.headers.length==0);
  }
  rander() {
    const tocDOM = generateDOM.call(this, this.headers, this.levels);
    this.toc.appendChild(tocDOM);
  }
  updateToc() {
    if(this.disable()) return; // if no header or display=none, don't update
    this.updateActive();
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
  updateActive() {
    /*
    --------------- headerBottom0
    ~~~~~~~~~~~~~~~~~~~~~~~~~~ scrollViewpoint
    --------------- headerBottom1 active
    ~~~~~~~~~~~~~~~~~~~~~~~~~~ scrollViewpointMiddle
    --------------- headerBottom2 
    ~~~~~~~~~~~~~~~~~~~~~~~~~~ scrollViewpointBottom
    --------------- headerBottom3
    */
    const scrollViewpointTop = this.scroller.scrollTop, 
      scrollViewpointHeight = this.scroller.clientHeight, 
      scrollViewpointMiddle = scrollViewpointTop + scrollViewpointHeight/2;
    let i, currentHeader, activeHeader=null;
    for(i=0; i<this.headers.length; i++) {
      currentHeader = this.headers[i];
      const headerHeight = currentHeader.clientHeight,
        headerTop = TOOL.positionRelative(currentHeader, this.scroller).top,
        headerBottom = headerHeight+headerTop;
      if(scrollViewpointMiddle>headerBottom) {
        activeHeader = currentHeader;
      } else {
        break; // next
      }
    }
    // console.log(scrollViewpointButton, activeHeader)
    // refresh 'active' class 
    const activeClass = this.activeClass;
    this.headers.forEach(header => header.classList.remove(activeClass));      // header in content
    this.headersDOMlist.forEach(tocdom => tocdom.classList.remove(activeClass)); // link in toc
    let index = (this.headers.length <= i ? this.headers.length : i)-1;
    if(activeHeader){
      activeHeader.classList.add(activeClass);
      this.headersDOMlist[index].classList.add(activeClass);
      // 
      let headerLevel = this.headersLevel[index];
      for(index=index-1;index>=0; index--) { // set 'active' class into parent headers
        const curHeaderLevel = this.headersLevel[index], curHeader = this.headers[index], curTocDom = this.headersDOMlist[index];
        if(headerLevel>curHeaderLevel) {
          curHeader.classList.add(activeClass);
          curTocDom.classList.add(activeClass);
          // 
          headerLevel = curHeaderLevel;
        }
        if(this.topLevel==curHeaderLevel) {
          break;
        }
      }
    } 
  }
}

module.exports = {
  Toc
};
