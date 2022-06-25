---
# dynamic generate from _data 
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
    sources: {{ _sources | json | replace: "=>", ":"}}
  };
  window.VARIABLES = VARIABLES;
  window.VARIABLES.append = function(obj) {
    Object.assign(VARIABLES, obj);
  }
})();