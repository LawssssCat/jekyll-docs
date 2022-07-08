const lazyload = require('lazyload');
const TOOL = require('tool-box');

lazyload.onload(() => {
  const articleContent = window.document.querySelector('.js-article-content');

  // 'h1[id], h2[id], ...'
  const selectors = [
    'h1[id]', 
    'h2[id]', 
    'h3[id]', 
    'h4[id]', 
    'h5[id]'
  ];
  articleContent.querySelectorAll(selectors.join(',')).forEach(dom => {
    const anchor = TOOL.createDOM('<a class="anchor d-print-none"></a>');
    anchor.innerHTML = '#';
    dom.appendChild(anchor);
    let headerTop;
    anchor.addEventListener('click', () => {
      headerTop = TOOL.positionRelative(dom, window.VARIABLES.pageScroller).top;
      window.VARIABLES.pageScrollTarget.scroll({
        top: headerTop,
        behavior: 'smooth'
      });
    });
  });

});
