(function() {
  var $root = document.getElementsByClassName('layout--base')[0];
  if (window.hasEvent('touchstart')) {
    // $root.dataset.isTouch = true;
    $root.setAttribute('data-is-touch', true);
  } else {
    $root.setAttribute('data-is-touch', false);
  }
})();

(function() {

  // read session
  var session_name = "data-theme-" + 'asfawegasfasdfsd';
  var session_theme = window.sessionStorage.getItem(session_name);

  var themes = [];
  {%- for theme in site.data.variables.themes -%}
    themes.push("{{ theme }}");
  {%- endfor -%}

  {%- include snippets/get-theme.html -%}
  var cur_theme = "{{ __return }}";
  var cur_theme_index;
  if(session_theme) {
    cur_theme = session_theme;
  }

  function index_get(theme) {
    var index;
    for(index=0; index<themes.length; index++) {
      if(themes[index] == theme) {
        break;
      }
    }
    return index;
  }

  cur_theme_index = index_get(cur_theme);

  function index_increase() {
    cur_theme_index = cur_theme_index+1;
    if(cur_theme_index>=themes.length) {
      cur_theme_index=0
    }
  }

  function theme_change(theme) {
    document.querySelectorAll('.theme-panel_title').forEach(item => {
      item.innerHTML = theme;
    });
    var html = document.querySelectorAll('html')[0];
    html.setAttribute('data-theme', theme);
    window.sessionStorage.setItem(session_name, theme);
  }

  theme_change(cur_theme);

  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', function(target) {
      index_increase();
      var theme = themes[cur_theme_index];
      theme_change(theme);
    });
  })
})();