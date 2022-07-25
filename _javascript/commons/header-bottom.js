const lazyload = require('lazyload');

lazyload.onload(() => {
  const header = document.querySelector('.js-header .header');
  const headerBottom = document.querySelector('.js-header .header__bottom');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        headerBottom.style.position = 'static';
      } else {
        headerBottom.style.position = 'fixed';
      }
    });
  });

  observer.observe(header);
});
