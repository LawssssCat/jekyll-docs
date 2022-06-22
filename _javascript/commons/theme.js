(function() {

  // read session
  var sessionName = 'data-theme-' + 'asfawegasfasdfsd';
  var sessionTheme = window.sessionStorage.getItem(sessionName);

  var themes = window.VARIABLES.themes;
  var curTheme = window.VARIABLES.cur_theme;
  var curThemeIndex;
  if(sessionTheme) {
    curTheme = sessionTheme;
  }

  function indexGet(theme) {
    var index;
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
    var html = document.querySelectorAll('html')[0];
    html.setAttribute('data-theme', theme);
    window.sessionStorage.setItem(sessionName, theme);
  }

  themeChange(curTheme);

  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      indexIncrease();
      var theme = themes[curThemeIndex];
      themeChange(theme);
    });
  });
})();
