const lazyload = require('lazyload');

lazyload.onload(() => {
  const activeClass = 'active';
  window.document.querySelectorAll('.block-tabs').forEach(block => {
    const wrapper = block.querySelector('.tab-navs-wrapper');
    const tabs = wrapper.querySelector('.tab-navs');
    // click
    const navs=tabs.querySelectorAll('.tab-nav'), contents=block.querySelectorAll('.tab-content');
    navs.forEach((nav,index) => {
      nav.addEventListener('click', () => {
        navs.forEach(item => item.classList.remove(activeClass));
        nav.classList.add(activeClass);
        contents.forEach(item => item.classList.remove(activeClass));
        contents[index].classList.add(activeClass);
      });
    });
    // overflow
    const toggleLeft = wrapper.querySelector('.tab-toggle-left');
    const toggleRight = wrapper.querySelector('.tab-toggle-right');
    new ResizeObserver(() => {
      if(wrapper.scrollWidth > wrapper.offsetWidth) {
        toggleLeft.classList.add(activeClass);
        toggleRight.classList.add(activeClass);
      } else {
        toggleLeft.classList.remove(activeClass);
        toggleRight.classList.remove(activeClass);
      }
    }).observe(wrapper);
  });
});
