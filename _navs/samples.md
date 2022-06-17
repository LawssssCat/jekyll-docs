---
layout: page
title: Samples
permalink: /samples.html
---
<div class="layout--articles">
  <section>
    <header><h2>Page Layout</h2></header>
    {%- include article-list.html -%}
  </section>
</div>

{%- for item in site.sample_pages -%}
{%- include snippets/get-accessible-url.html url=item.url -%}
- [{{ item.title }}]({{ __return }})
{%- endfor -%}