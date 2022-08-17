const lazyload = require('lazyload');

const activeClass = 'active';

lazyload.onload(() => {
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
    let toggleIndex=0;
    new ResizeObserver(() => {
      let move = calcToggleMove(wrapper, navs, toggleIndex);
      showMoveToggle(wrapper, move, toggleLeft, toggleRight);
    }).observe(wrapper);
    toggleLeft.addEventListener('click', () => {
      toggleIndex = calcToggleIndex(navs, toggleIndex, -1);
      let move = calcToggleMove(wrapper, navs, toggleIndex);
      doToggleMove(tabs, move);
      showMoveToggle(wrapper, move, toggleLeft, toggleRight);
    });
    toggleRight.addEventListener('click', () => {
      toggleIndex = calcToggleIndex(navs, toggleIndex, 1);
      let move = calcToggleMove(wrapper, navs, toggleIndex);
      doToggleMove(tabs, move);
      showMoveToggle(wrapper, move, toggleLeft, toggleRight);
    });
  });
});

function showMoveToggle(wrapper, move, toggleLeft, toggleRight) {
  if(wrapper.scrollWidth > wrapper.offsetWidth) {
    if(move>0) {
      toggleLeft.classList.add(activeClass);
    } else {
      toggleLeft.classList.remove(activeClass);
    }
    if((move+wrapper.offsetWidth)<wrapper.scrollWidth) {
      toggleRight.classList.add(activeClass);
    } else {
      toggleRight.classList.remove(activeClass);
    }
  } else {
    toggleLeft.classList.remove(activeClass);
    toggleRight.classList.remove(activeClass);
  }
}

function calcToggleIndex(navs, index, change) {
  let value = index + change;
  if(value<0) {
    value = 0; 
  } else if(value>=navs.length) {
    value = navs.length - 1;
  }
  return value;
}

function calcToggleMove(wrapper, navs, index) {
  let move=0, max=wrapper.scrollWidth-wrapper.offsetWidth;
  for(let i=0; i<index; i++) {
    const nav = navs[i];
    move += nav.offsetWidth;
  }
  return move>max ? max : move;
}

function doToggleMove(tabs, move) {
  tabs.style.transform = `translateX(-${move}px)`;
}
