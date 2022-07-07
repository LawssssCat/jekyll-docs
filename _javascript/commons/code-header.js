const lazyload = require('lazyload');

lazyload.onload(() => {
  // <figure class="highlight"><pre><code class="language-liquid" data-lang="liquid">............</code>
  const tagRenderSelector='figure.highlight';
  window.document.querySelectorAll(tagRenderSelector).forEach(dom => {
    const code = dom.querySelector('code');
    if(code) {
      const header = window.document.createElement('div');
      dom.prepend(header);

      const headerLang = window.document.createElement('div');
      header.appendChild(headerLang);
      const lang = code.getAttribute('data-lang');
      headerLang.innerHTML = lang;

      const headerCopy = window.document.createElement('div');
      header.appendChild(headerCopy);
      headerCopy.innerHTML = 'Copy';
      

    }
  });
  // <div class="language-javascript highlighter-rouge"><div class="highlight"><pre class="highlight"><code>...</code>
  const kramRenderSelector='.highlighter-rouge';
  window.document.querySelectorAll(kramRenderSelector).forEach(dom => {

  });
});

