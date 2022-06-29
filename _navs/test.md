---
layout: article
title: text and typography
author: foo
tags: ['test', 'typography']
aside: 
  toc: true
---

# H1
{: toc-header-ignore='true'}
## H2
{: toc-header-ignore='true'}
### H3
{: toc-header-ignore='true'}
#### H4
{: toc-header-ignore='true'}
##### H5
{: toc-header-ignore='true'}
###### H6
{: toc-header-ignore='true'}

## Paragraph

asfsd  asf1 as23fasdf5345sd 3s1f 3asd 1asd53f4asf4 s35f1 sd31 asd3f4 asd351 asd3f4asd 35f4s6g4e3as1f3as 135asd1 asd3 1fasd3f1asd23f1asd 3f4 53asad f1 sfasd86 4s3 as23fasdf5345sd

sf safasdfs43f5asef3fas 1ase3fs1e531 ase sea accessible
asf1as23ef1ase3 13fs1fas eachfsf 
asfase23f 1s.efasf1as5ef1as as efasf1as5ef1asasf ase5asf
 asf1ase23f1ase3f1ase sf f1sae 
  asf1safase ase 

asfasdg1a53g31af .sd0g .asd
f sdaf asd1 sd31 sd.f1as5e1f 3se 

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

## Code

js

```js
(function() {
  var SOURCES = window.TEXT_VARIABLES.sources;
  window.Lazyload.js(SOURCES.jquery, function() {
    $(function() {
      var $this ,$scroll;
      var $articleContent = $('.js-article-content');
      var hasSidebar = $('.js-page-root').hasClass('layout--page--sidebar');
      var scroll = hasSidebar ? '.js-page-main' : 'html, body';
      $scroll = $(scroll);

      $articleContent.find('.highlight').each(function() {
        $this = $(this);
        $this.attr('data-lang', $this.find('code').attr('data-lang'));
      });
      $articleContent.find('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]').each(function() {
        $this = $(this);
        $this.append($('<a class="anchor d-print-none" aria-hidden="true"></a>').html('<i class="fas fa-anchor"></i>'));
      });
      $articleContent.on('click', '.anchor', function() {
        $scroll.scrollToAnchor('#' + $(this).parent().attr('id'), 400);
      });
    });
  });
})();
```

html

```html
<div class="layout--page layout--page--sidebar clearfix js-page-root">
  <div class="page__mask d-print-none js-page-mask js-sidebar-hide"></div>
  <div class="page__viewport">
    <div class="page__actions d-print-none">
      <div class="button button--circle button--lg box-shadow-2 sidebar-button js-sidebar-show js-sidebar-show-1 js-sidebar-show-2 js-sidebar-show-3">
        <i class="fas fa-bars icon--show"></i>
      </div>
    </div>
  </div>
</div>
```

ruby

```ruby
Jekyll::Hooks.register(:site, :pre_render) do |site|

  # insert posts last modify 
  Jekyll.logger.debug "Hook: insert posts last modify"
  site.collection_names.each do | collection_name |
    _collection = site.collections[collection_name]
    _collection.docs.each do | post |
      # puts post.url
      commit_num = `git rev-list --count HEAD "#{ post.path }"`
      if commit_num.to_i > 0
        # lastmod_date = `git log -1 --pretty="%ad" --date=iso "#{ post.path }"`
        commit_dates = `git log --pretty="%ad" --date=iso "#{ post.path }"`.lines()
        lastmod_date = commit_dates[0]
        publish_date = commit_dates[-1]
        post.data['last_modified_at'] = lastmod_date
        post.data['first_publish_at'] = publish_date
      end
    end
  end

end
```

## Horizontal rule

---

## List

+ 1
  + 1.1
  + 1.2
  + 1.3
+ 2 
+ 3
+ 4 
+ 5 

---

1. a
  1. additions
  1. all
  1. accessible
1. base 
1. class
1. data
1. each 

---

+ 1
+ 2 
  1. haha
  2. baba
    + q


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



123
</textarea>