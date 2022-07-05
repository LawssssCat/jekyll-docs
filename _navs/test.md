---
layout: article
title: text and typography
author: foo
tags: ['test', 'typography']
aside: 
  toc: true
---


{::comment}
This text is completely ignored by kramdown - a comment in the text.
{:/comment}

Do you see {::comment}this text{:/comment}?
{::comment}some other comment{:/}

{::options key="val" /}

A simple paragraph with an ID attribute.
{: #para-one}

> A blockquote with a title
{:title="The blockquote title"}
{: #myid}

{:.ruby}
    Some code here

This *is*{:.underline} some `code`{:#id}{:.class}.
A [link](test.html){:rel='something'} and some **tools**{:.tools}.

This *is italic*{::}*marked*{:.special} text

## Button

```html
<div class="button button--primary">primary</div>
```

<p>
  <div class="button button--primary">
  primary
  </div>
  <div class="button button--secondary">
  secondary
  </div>
  <div class="button button--success">
  success
  </div>
  <div class="button button--info">
  info
  </div>
  <div class="button button--warning">
  warning
  </div>
  <div class="button button--error">
  error
  </div>
  <div class="button button--theme-light">
  theme-light
  </div>
  <div class="button button--theme-dark">
  theme-dark
  </div>
  
  <br>

  <div class="button button--outline-primary">
  outline-primary
  </div>
  <div class="button button--outline-secondary">
  outline-secondary
  </div>
  <div class="button button--outline-success">
  outline-success
  </div>
  <div class="button button--outline-info">
  outline-info
  </div>
  <div class="button button--outline-warning">
  outline-warning
  </div>
  <div class="button button--outline-error">
  outline-error
  </div>
  <div class="button button--outline-theme-light">
  outline-theme-light
  </div>
  <div class="button button--outline-theme-dark">
  outline-theme-dark
  </div>

  <br>

  <div class="button button--outline-primary">
  primary
  </div>
  <div class="button button--outline-primary button--pill">
  primary pill
  </div>
  <div class="button button--outline-primary button--rounded">
  primary rounded
  </div> 
  <div class="button button--outline-primary button--circle">
  circle
  </div>

  <br>

  <div class="button button--primary">
  primary
  </div>
  <div class="button button--primary button--pill button--xs">
  primary xs
  </div>
  <div class="button button--primary button--pill button--sm">
  primary sm
  </div>
  <div class="button button--primary button--pill button--md">
  primary md
  </div>
  <div class="button button--primary button--pill button--lg">
  primary lg
  </div>
  <div class="button button--primary button--pill button--xl">
  primary xl
  </div>
</p>


## Popover

```html
<div class="button button--primary button--pill" 
data-one-toggle="popover" 
data-one-trigger="click" 
data-one-title="title.title.title.title.title.title." 
data-one-content="content.content.content.content.content.content.content.content.content.">
click to show popover
</div>
```

<div class="button button--primary button--pill"
data-one-toggle="popover" 
data-one-trigger="click" 
data-one-title="title.title.title.title.title.title." 
data-one-content="content.content.content.content.content.content.content.content.content.">
click to show popover
</div>

options 
- `data-one-trigger`: `click` `hover` `focus` `manual`

## textarea

<textarea>
haha

baba

!



https://jekyllrb.com/docs/variables/
{{site.time}}
============================= site.pages
{% for _page in site.pages %}
  {{ _page.url }}
{% endfor %}
============================= site.posts
{% for _post in site.posts %}
  {{ _post.url }}
{% endfor %}
============================= site.related_posts
{% for _post in site.related_posts %}
  {{ _post.url }}
{% endfor %}
============================= site.static_files
{% for _post in site.static_files %}
  {{ _post.path }}
{% endfor %}
============================= site.html_pages
{% for _post in site.html_pages %}
  {{ _post.url }}
{% endfor %}
============================= site.documents
{% for _post in site.documents %}
  - url {{ _post.url }}
    id {{ _post.id }}
    key {{ _post.key }}
{% endfor %}
</textarea>