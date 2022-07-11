---
# dynamic generate from _data 
# Do not use '//' in the script, bu use '/*..........*/' for comments
layout: compress
---

{%- include snippets/get-themes.html -%}
{%- assign _themes = __return -%}
{%- include snippets/get-theme.html -%}
{%- assign cur_theme = __return -%}

{%- include snippets/get-sources.html -%}
{%- assign _sources = __return -%}

(function() {
  var VARIABLES = {
    themes: [
      {%- for _theme in _themes -%}
      "{{ _theme }}"{% unless forloop.last %},{% endunless %}
      {%- endfor -%}
    ],
    cur_theme: "{{ cur_theme }}",
    sources: {{ _sources | json | replace: "=>", ":"}},
    pageScrollTarget: window,
    pageScroller: (window.document.scrollingElement || window.document.documentElement || window.document.body),
    pageScrollerBehavior: "smooth"
  };
  window.VARIABLES = VARIABLES;
  window.VARIABLES.append = function(obj) {
    Object.assign(VARIABLES, obj);
  }
})();