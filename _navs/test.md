---
layout: article
title: text and typography
---


# H1
## H2
### H3
#### H4
##### H5
###### H6

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

---

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