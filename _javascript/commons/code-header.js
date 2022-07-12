const lazyload = require('lazyload');
const TOOL = require('tool-box');
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
    const popper = new CodeHeaderPopper(headerCopy);
    let hover = false;
    headerCopy.addEventListener('mouseover', () => {
      if(!hover) { // only the first hover event is active until 'mouseout'.
        headerCopy.setCopyReady();
        popper.show('Copy to clipboard');
      }
      hover = true;
    });
    headerCopy.addEventListener('mouseout', (e) => {
      if(!headerCopy.contains(e.toElement)) { // out copy toggle and it's child
        hover = false;
        headerCopy.setCopyReady();
        popper.remove();
      }
    });
    headerCopy.addEventListener('click', () => {
      popper.remove();
      TOOL.copyTextToClipboard(this.code.textContent).then(() => {
        // show popover when copy ok
        headerCopy.setCopyOk();
        popper.show('Copied!');
      });
    });
  }
}

class CodeHeaderPopper {
  constructor(toggle) {
    this.toggle = toggle;
    this.popperDOM = window.document.createElement('div');
  }
  show(innerHTML, callback) {
    if(innerHTML) {
      this.popperDOM.innerHTML = innerHTML;
    }
    if(!window.document.body.contains(this.popperDOM)) {
      window.document.body.append(this.popperDOM);
    }
    if(!this.popper) {
      this.popper = window.Popper.createPopper(this.toggle, this.popperDOM, {
        placement: 'top'
      });
    }
    this.popper.update();
    callback && callback();
  }
  remove() {
    if(this.popper) {
      this.popper.setOptions((options) => ({ // remove listener
        ...options,
        modifiers: [
          ...options.modifiers,
          { name: 'eventListeners', enabled: false }
        ]
      }));
    }
    this.popper = null; // release obj
    if(window.document.body.contains(this.popperDOM)) { // remove dom
      window.document.body.removeChild(this.popperDOM);
    }
  }
}
