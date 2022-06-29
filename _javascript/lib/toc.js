
const {Stack} = require('lib/stack');

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
    stackDOM = new Stack([result]);

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
      preDOM.appendChild(li); // top is 'li' not 'ol'
      preLevel++;
      stackDOM.push(li);
      index++;
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
    if(this.headers.length==0) this.disable = true;

    // rander
    this.rander();
  }
  rander() {
    const tocDOM = generateDOM(this.headers, this.levels);
    this.toc.appendChild(tocDOM);
  }
}

module.exports = {
  Toc
};
