---
layout: article
title: Common links
article_header: 
  type: cover
  image:
    src: assets/images/cover2.jpg
---

<h2>all posts in this site</h2>

<ul>
{%- for post in site.posts -%}
  <li>
    {%- include snippets/get-accessible-url.html url=post.url -%}
    <span>{{ post.title }}</span> - <a href="{{ __return }}">read more</a>
  </li>
{%- endfor -%}
</ul>