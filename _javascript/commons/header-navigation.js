// popper.js 
// see https://popper.js.org/

const TOOL = require('tool-box');
const lazyload = require('lazyload');

lazyload.onload(() => {
  new HeaderNav().init();
});

const HeaderNavConst = {
  activeClass: 'active',
  mobile_navActiveClass: 'navigation--mobile-open'
};
class HeaderNavToggle {
  constructor(header) {
    this.header = header;
    this.toggle = header.querySelector('.navigation__toggle');
  }
  init() {
    const toggleClassName = HeaderNavConst.mobile_navActiveClass;
    const header = this.header;
    const toggle = this.toggle;
    toggle.addEventListener('click', (e) => {
      if((e.composedPath?e.composedPath():e.path).includes(toggle) && !header.classList.contains(toggleClassName)) {
        header.classList.add(toggleClassName);
        TOOL.lockScroll();
      } else {
        header.classList.remove(toggleClassName);
        TOOL.unlockScroll();
      }
    });
    TOOL.respondToVisibility(toggle, (visible) => {
      if(!visible) {
        header.classList.remove(toggleClassName);
        TOOL.unlockScroll();
        this.visible = false;
      } else {
        this.visible = true;
      }
    });
  }
  isVisible() {
    return this.visible;
  }
}
class HeaderNav {
  constructor() {
    this.navs = [];
    const header = window.document.querySelector('.js-header');
    // toggle
    this.toggle = new HeaderNavToggle(header);
    // navs
    header.querySelectorAll('.navigation__item').forEach(dom => {
      const nav = {
        dom: dom
      };
      this.navs.push(nav);
      nav.itemLinkDom = nav.dom.querySelector('.navigation__item-link');
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
  isMediaDown() {
    return this.toggle.isVisible();
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
        const l = TOOL.height(nav.subLeftContent);
        const r = Math.max(...nav.subRgithContent.map(menu => {
          return TOOL.height(menu.dom);
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
    // toggle init
    this.toggle.init();
    // reset
    this.clearActive();
    // event linstener
    this.navs.forEach((nav) => {
      if(nav.hasSubNav) {

        // media up
        nav.dom.addEventListener('mouseenter', (e) => {
          if(this.isMediaDown()) {
            return;
          }
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
          if(this.isMediaDown()) {
            return;
          }
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
            if(this.isMediaDown()) {
              return;
            }
            e.preventDefault();
            this.setSubBlockActive(nav, index);
          });
        });

        // media down
        nav.itemLinkDom.addEventListener('click', () => {
          if(!this.isMediaDown()) {
            return;
          }
          const flag = nav.dom.classList.contains(HeaderNavConst.activeClass);
          this.clearActive();
          if(!flag) {
            nav.dom.classList.add(HeaderNavConst.activeClass);
          }
        });
        nav.subLeftNavs.forEach((leftNav, index) => {
          leftNav.dom.addEventListener('click', () => {
            if(!this.isMediaDown()) {
              return;
            }
            this.setSubBlockActive(nav, index);
          });
        });
      }
    });
  }
  switchLeftNavsOpen(openLeftNav) {
    const openClassName = HeaderNavConst.activeClass;
    const flag = openLeftNav;
    this.navs.forEach(_n => {
      const leftNavs = _n.subLeftNavs;
      if(leftNavs) {
        leftNavs.forEach(subLeftNav => subLeftNav.dom.classList.remove(openClassName));
      }
    });
    if(flag) {
      openLeftNav.dom.classList.add(openClassName);
    }
  }
}
