const lazyload = require('lazyload');
const TOOL = require('tool-box');

lazyload.onload(() => {
  // <figure class="highlight"><pre><code class="language-liquid" data-lang="liquid">............</code>
  const tagRenderSelector='figure.highlight';
  window.document.querySelectorAll(tagRenderSelector).forEach(dom => {
    const code = dom.querySelector('code');
    if(code) {
      const lang = code.getAttribute('data-lang');
      createCodeHeader(dom, code, lang);
    }
  });
  // <div class="language-javascript highlighter-rouge"><div class="highlight"><pre class="highlight"><code>...</code>
  const kramRenderSelector='.highlighter-rouge';
  window.document.querySelectorAll(kramRenderSelector).forEach(dom => {
    const code = dom.querySelector('code');
    if(code) {
      const className = Array.from(dom.classList).find(item => {
        return item.startsWith('language-');
      });
      const lang = className.replace('language-', '');
      createCodeHeader(dom, code, lang);
    }
  });
});

function createCodeHeader(dom, code, lang) {
  const header = window.document.createElement('div');
  dom.prepend(header);

  const headerLang = window.document.createElement('div');
  header.appendChild(headerLang);
  headerLang.innerHTML = lang;

  const headerCopy = window.document.createElement('div');
  header.appendChild(headerCopy);
  headerCopy.innerHTML = 'Copy';
  headerCopy.addEventListener('click', () => {
    TOOL.copyTextToClipboard(dom.textContent).then(() => {
      console.log('copy ok');
    });
  });
}
