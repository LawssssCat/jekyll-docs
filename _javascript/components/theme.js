// read session
let sessionName = 'data-theme-' + 'asfawegasfasdfsd';
let sessionTheme = window.sessionStorage.getItem(sessionName);

let themes = window.VARIABLES.themes;
let curTheme = window.VARIABLES.cur_theme;
let curThemeIndex;
if(sessionTheme) {
  curTheme = sessionTheme;
}

function indexGet(theme) {
  let index;
  for(index=0; index<themes.length; index++) {
    if(themes[index] == theme) {
      break;
    }
  }
  return index;
}

curThemeIndex = indexGet(curTheme);

function indexIncrease() {
  curThemeIndex = curThemeIndex+1;
  if(curThemeIndex>=themes.length) {
    curThemeIndex=0;
  }
}

function themeChange(theme) {
  document.querySelectorAll('.theme-panel_title').forEach(item => {
    item.innerHTML = theme;
  });
  let html = document.querySelectorAll('html')[0];
  html.setAttribute('data-theme', theme);
  window.sessionStorage.setItem(sessionName, theme);
}

themeChange(curTheme);

document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    indexIncrease();
    let theme = themes[curThemeIndex];
    themeChange(theme);
  });
});
