---
layout: article
---

{%- assign _sub_navs = site.data.navigation.header | where: 'parent', 'others' -%}

<ul>
  {%- for _sub_nav in _sub_navs -%}
    <li>
      <span>
      {%- include snippets/get-nav-title.html nav=_sub_nav -%}
      {%- assign _title = __return -%}
      {{ _title }} 
      </span> -&nbsp;
      {%- include snippets/get-nav-url.html path=_sub_nav.url -%}
      {%- assign _url = __return -%}
      <a href="{{ _url }}">..{{ _sub_nav.url }}</a>
      <p>{{ _sub_nav.description }}</p>
    </li>
  {%- endfor -%}
</ul>
