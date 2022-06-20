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
  {%- include snippets/get-theme.html -%}
  var cur_theme = "{{ __return }}";
  var themes = [];
  {%- for theme in site.data.variables.themes -%}
    themes.push("{{ theme }}");
  {%- endfor -%}

  var cur_theme_index;
  for(cur_theme_index=0; cur_theme_index<themes.length; cur_theme_index++) {
    if(themes[cur_theme_index] == cur_theme) {
      break;
    }
  }

  function index_increase() {
    cur_theme_index = cur_theme_index+1;
    if(cur_theme_index>=themes.length) {
      cur_theme_index=0
    }
  }

  var html = document.querySelectorAll('html')[0]
  document.querySelectorAll('.btn_theme').forEach(btn => {
    btn.addEventListener('click', function(target) {
      index_increase();
      var theme = themes[cur_theme_index];
      target.path[0].innerHTML = theme;
      html.setAttribute('data-theme', theme);
    });
  })
})();