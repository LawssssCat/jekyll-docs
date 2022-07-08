const lazyload = require('lazyload');
const TOOL = require('tool-box');

lazyload.onload(() => {
  // <figure class="highlight"><pre><code class="language-liquid" data-lang="liquid">............</code>
  const tagRenderSelector='figure.highlight';
  window.document.querySelectorAll(tagRenderSelector).forEach(dom => {
    const pre = dom.querySelector('pre');
    if(pre) {
      const code = pre.querySelector('code');
      const lang = code.getAttribute('data-lang');
      dom.setAttribute('data-lang', lang);
      createCodeHeader(pre, code, lang);
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
      createCodeHeader(pre, code, lang);
    }
  });
});

let copyDonePopperDOM = window.document.createElement('div');
copyDonePopperDOM.innerHTML = 'copy done!';

function createCodeHeader(pre, code, lang) {
  const header = window.document.createElement('div');
  pre.parentNode.prepend(header);
  header.classList.add('code-header');

  const headerLang = window.document.createElement('div');
  header.appendChild(headerLang);
  headerLang.innerHTML = lang;
  headerLang.classList.add('code-lang');

  const headerCopy = window.document.createElement('div');
  header.appendChild(headerCopy);
  headerCopy.innerHTML = '<i class="fas fa-copy"></i>&nbsp;Copy';
  headerCopy.classList.add('code-toggle-copy');
  headerCopy.addEventListener('click', () => {
    TOOL.copyTextToClipboard(code.textContent).then(() => {
      // show popover when copy ok
      const sources = window.VARIABLES.sources;
      lazyload.js([sources.popper.js], function() {
        window.document.body.append(copyDonePopperDOM);
        const popper = window.Popper.createPopper(headerCopy, copyDonePopperDOM, {
          placement: 'left'
        });
        setTimeout(() => {
          popper.setOptions((options) => ({ // remove listener
            ...options,
            modifiers: [
              ...options.modifiers,
              { name: 'eventListeners', enabled: false }
            ]
          }));
          window.document.body.removeChild(copyDonePopperDOM);
        }, 1000);
      });
    });
  });
}
