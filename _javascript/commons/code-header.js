// popper.js 
// see https://popper.js.org/

const lazyload = require('lazyload');
const TOOL     = require('tool-box');
const {Popper} = require('lib/popper');
const sources = window.VARIABLES.sources;

lazyload.js([sources.popper.js], () => {
  // <figure class="highlight"><pre><code class="language-liquid" data-lang="liquid">............</code>
  const tagRenderSelector='figure.highlight';
  window.document.querySelectorAll(tagRenderSelector).forEach(dom => {
    const pre = dom.querySelector('pre');
    if(pre) {
      const code = pre.querySelector('code');
      const lang = code.getAttribute('data-lang');
      dom.setAttribute('data-lang', lang);
      new CodeHeader(pre, code, lang).init();
    }
  });
  // <div class="language-javascript highlighter-rouge"><div class="highlight"><pre class="highlight"><code>...</code>
  const kramRenderSelector='.highlighter-rouge';
  window.document.querySelectorAll(kramRenderSelector).forEach(dom => {
    const pre = dom.querySelector('pre');
    if(pre) {
      const code = dom.querySelector('code');
      const className = Array.from(dom.classList).find(item => {
        return item.startsWith('language-');
      });
      const lang = className.replace('language-', '');
      dom.setAttribute('data-lang', lang);
      new CodeHeader(pre, code, lang).init();
    }
  });
});

class CodeHeader {
  constructor(pre, code, lang) {
    this.pre = pre;
    this.code = code;
    this.lang = lang;
  }
  init() {
    const header = this.header = window.document.createElement('div');
    this.pre.parentNode.prepend(header);
    header.classList.add('code-header');
    // lang
    const headerLang = window.document.createElement('div');
    header.appendChild(headerLang);
    headerLang.innerHTML = this.lang;
    headerLang.classList.add('code-lang');
    // copy
    const headerCopy = window.document.createElement('div');
    header.appendChild(headerCopy);
    headerCopy.classList.add('code-toggle-copy');
    headerCopy.setCopyReady = function() {
      this.innerHTML = '<i class="fas fa-clipboard"></i>';
    };
    headerCopy.setCopyOk = function() {
      this.innerHTML = '<i class="fas fa-check"></i>';
    };
    headerCopy.setCopyReady();
    // listener
    let hover = false, setCopyReadyFlag = false;
    const popperContentReady = 'Copy to clipboard';
    const popperContentOk    = 'Copied!';
    const popper = new Popper({
      toggle: headerCopy,
      toggleEvents: ['hover'],
      content: popperContentReady,
      showCallback: () => {
        if(!hover) { // only the first hover event is active until 'mouseout'.
          popper.setContent(popperContentReady);
        }
        hover = true;
      },
      hidePreCallBack: (e) => {
        if(!e) return true;
        if(!headerCopy.contains(e.toElement)) { // out copy toggle and it's child
          hover = false;
          if(setCopyReadyFlag) {
            headerCopy.setCopyReady();
            setCopyReadyFlag = false;
          }
          return true; // allow to hide
        }
        return false; // prevent to hide
      }
    }).init();
    let setCopyReadyTimeoutClock;
    headerCopy.addEventListener('click', () => {
      popper.hide();
      TOOL.copyTextToClipboard(this.code.textContent).then(() => {
        // show popover when copy ok
        popper.setContent(popperContentOk);
        popper.show();
        headerCopy.setCopyOk();
        if(!setCopyReadyTimeoutClock) {
          setCopyReadyTimeoutClock = setTimeout(() => {
            if(hover) {
              setCopyReadyFlag = true;
            } else {
              headerCopy.setCopyReady();
            }
            setCopyReadyTimeoutClock = null;
          }, 1000);
        }
      });
    });
  }
}
