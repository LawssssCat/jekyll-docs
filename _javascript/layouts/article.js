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
    const anchor = window.document.createElement('a');
    anchor.classList.add('anchor');
    anchor.classList.add('d-print-none');
    anchor.innerHTML = '#';
    dom.appendChild(anchor);
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      TOOL.historyPushHash(dom.id);
    });
  });

});
