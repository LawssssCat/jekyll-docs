// popper.js 
// see https://popper.js.org/

const lazyload = require('lazyload');
const TOOL     = require('tool-box');
const {Popper} = require('lib/popper');
const sources = window.VARIABLES.sources;
const logger = require('logger');

lazyload.js([sources.popper.js], () => {
  // <figure class="highlight"><pre><code class="language-liquid" data-lang="liquid">............</code>
  const tagRenderSelector='figure.highlight';
  window.document.querySelectorAll(tagRenderSelector).forEach(dom => {
    const pre = dom.querySelector('pre');
    if(pre) { // filter ``
      const code = pre.querySelector('code');
      const lang = code.getAttribute('data-lang');
      dom.setAttribute('data-lang', lang);
      new CodeHeader(dom, pre, lang).init();
    }
  });
  // <div class="language-javascript highlighter-rouge"><div class="highlight"><pre class="highlight"><code>...</code>
  const kramRenderSelector='.highlighter-rouge';
  window.document.querySelectorAll(kramRenderSelector).forEach(dom => {
    const pre = dom.querySelector('pre');
    if(pre) {
      const className = Array.from(dom.classList).find(item => {
        return item.startsWith('language-');
      });
      const lang = className.replace('language-', '');
      dom.setAttribute('data-lang', lang);
      new CodeHeader(dom, pre, lang).init();
    }
  });
});

class CodeHeader {
  constructor(dom, pre, lang) {
    this.dom = dom;
    this.pre = pre;
    this.lang = lang;
  }
  init() {
    if(this.dom.classList.contains('no-code-header')) {
      logger.isDebug() && logger.debug('code-header.js', 'no code header', this.dom);
      return ;
    }
    const header = this.header = window.document.createElement('div');
    this.pre.parentNode.prepend(header);
    header.classList.add('code-header');
    // lang
    const headerLang = window.document.createElement('div');
    header.appendChild(headerLang);
    headerLang.innerHTML = this.lang || '&nbsp;';
    headerLang.classList.add('code-lang');
    // toggle
    const headerToggleWrapper = window.document.createElement('ul');
    header.appendChild(headerToggleWrapper);
    headerToggleWrapper.classList.add('code-toggle-wrapper');
    // wrap
    this.initWrapToggle(headerToggleWrapper);
    // copy
    this.initCopyToggle(headerToggleWrapper);
    
  }
  initWrapToggle(wrapper) {
    const headerWrap = window.document.createElement('li');
    wrapper.appendChild(headerWrap);
    headerWrap.classList.add('code-toggle-wrap');
    headerWrap.classList.add('code-toggle');
    const headerWrapId = TOOL.generateId('code-header-wrap-switch');
    headerWrap.innerHTML = `
    <div class="switch-box">
      <input class="switch-input" type="checkbox" id="${headerWrapId}" checked>
      <label class="switch-label" for="${headerWrapId}">Wrap</label>
    </div>
    `;
    const toggle = headerWrap.querySelector(`#${headerWrapId}`);
    let func;
    toggle.addEventListener('click', func = () => {
      if(toggle.checked) {
        this.pre.style.whiteSpace = 'pre-wrap';
      } else {
        this.pre.style.whiteSpace = '';
      }
    });
    func();
  }
  initCopyToggle(wrapper) {
    const headerCopy = window.document.createElement('li');
    wrapper.appendChild(headerCopy);
    headerCopy.classList.add('code-toggle-copy');
    headerCopy.classList.add('code-toggle');
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
      const code = this.pre.querySelector('code');
      TOOL.copyTextToClipboard(code.textContent).then(() => {
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
