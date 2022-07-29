// popper.js 
// see https://popper.js.org/

const TOOL = require('tool-box');
const lazyload = require('lazyload');

lazyload.onload(() => {
  new HeaderNav().init();
});

const HeaderNavConst = {
  activeClass: 'active'
};
class HeaderNav {
  constructor() {
    this.navs = [];
    window.document.querySelectorAll('.navigation__item').forEach(dom => {
      const nav = {
        dom: dom
      };
      this.navs.push(nav);
      nav.subBlockDom = nav.dom.querySelector('.quicklinks-block');
      nav.hasSubNav = nav.subBlockDom ? true : false;
      if(nav.hasSubNav) {
        nav.subLeft = nav.subBlockDom.querySelector('.quicklinks-block-left');
        nav.subLeftContent = nav.subLeft.querySelector('.quicklinks-block-left-menu');
        nav.subLeftNavs = [];
        nav.subLeftContent.querySelectorAll('li').forEach(dom => {
          const subNav = {
            dom: dom
          };
          nav.subLeftNavs.push(subNav);
        });
        nav.subRight = nav.subBlockDom.querySelector('.quicklinks-block-right');
        nav.subRgithContent = [];
        nav.subRight.querySelectorAll('.quicklinks-block-right-menu').forEach(dom => {
          const subContent = {
            dom: dom
          };
          nav.subRgithContent.push(subContent);
          subContent.menuDomList = [];
          subContent.dom.querySelectorAll('.quicklinks-block-right-menu-item').forEach(dom => {
            subContent.menuDomList.push(dom);
          });
        });
      }
    });
  }
  clearActive(nav) {
    const navs = nav ? [nav] : this.navs;
    navs.forEach(nav => {
      nav.dom.classList.remove(HeaderNavConst.activeClass);
      this.clearBlockActive(nav);
    });
  }
  setSubBlockActive(nav, index) {
    if(nav.hasSubNav) {
      nav.subLeftNavs.forEach((subNav, _index) => {
        if(_index==index) {
          subNav.dom.classList.add(HeaderNavConst.activeClass);
          nav.subRgithContent[_index].dom.classList.add(HeaderNavConst.activeClass);
        } else {
          subNav.dom.classList.remove(HeaderNavConst.activeClass);
          nav.subRgithContent[_index].dom.classList.remove(HeaderNavConst.activeClass);
        }
      });
    }
  }
  clearBlockActive(nav) {
    this.setSubBlockActive(nav, -1);
  }
  setHeight(nav, h) {
    if(nav.hasSubNav) {
      if(!h) {
        const l = nav.subLeftContent.offsetHeight;
        const r = Math.max(...nav.subRgithContent.map(menu => {
          return menu.dom.offsetHeight;
        }));
        h = Math.max(l, r);
      }
      // max
      h = h>600 ? 600 : h;
      nav.subBlockDom.style.height = `${h}px`;
    }
  }
  clearHgith(nav) {
    nav.subBlockDom.style.height = '';
  }
  init() {
    // reset
    this.clearActive();
    // event linstener
    this.navs.forEach((nav) => {
      if(nav.hasSubNav) {
        nav.dom.addEventListener('mouseenter', (e) => {
          e.preventDefault();
          if(!nav.dom.contains(e.fromElement)) {
            if(!nav.isHoving) {
              nav.dom.classList.add(HeaderNavConst.activeClass);
              this.setHeight(nav);
              this.setSubBlockActive(nav, 0);
              TOOL.lockScroll();
              nav.isHoving = true;
            }
          }
        });
        nav.dom.addEventListener('mouseleave', (e) => {
          e.preventDefault();
          if(!nav.dom.contains(e.toElement)) {
            if(nav.isHoving) {
              this.clearHgith(nav);
              this.clearActive(nav);
              TOOL.unlockScroll();
              nav.isHoving = false;
            }
          }
        });
        nav.subLeftNavs.forEach((subnav, index) => {
          subnav.dom.addEventListener('mouseenter', (e) => {
            e.preventDefault();
            this.setSubBlockActive(nav, index);
          });
        });
      }
    });
  }
}
