const lazyload = require('lazyload');

lazyload.onload(() => {
  const activeClass = 'active';
  window.document.querySelectorAll('.block-tabs').forEach(tabs => {
    const navs=tabs.querySelectorAll('.tab-nav'), contents=tabs.querySelectorAll('.tab-content');
    navs.forEach((nav,index) => {
      nav.addEventListener('click', () => {
        navs.forEach(item => item.classList.remove(activeClass));
        contents.forEach(item => item.classList.remove(activeClass));
        contents[index].classList.add(activeClass);
        nav.classList.add(activeClass);
      });
    });
  });
});
