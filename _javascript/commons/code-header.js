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
      createCodeHeader(pre, code, lang);
    }
  });
});

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
      console.log('copy ok');
    });
  });
}
