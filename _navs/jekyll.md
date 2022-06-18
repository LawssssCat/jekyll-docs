---
layout: article
title: Jekyll - docs
---

Jekyll provice a simple way to make a static websit.

+ official website - <https://jekyllrb.com/>
+ github - <https://github.com/jekyll/jekyll>
+ jekyll - variables <https://jekyllrb.com/docs/variables/>

## all posts in this site

<ul>
{%- for post in site.posts -%}
  <li>
    {%- include snippets/get-accessible-url.html url=post.url -%}
    <span>{{ post.title }}</span> - <a href="{{ __return }}">read more</a>
  </li>
{%- endfor -%}
</ul>