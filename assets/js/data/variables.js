---
# dynamic generate from _data 
---

{%- assign _themes = site.data.variables.themes -%}
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
  };
  window.VARIABLES = VARIABLES;
})();