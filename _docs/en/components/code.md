---
layout: article
title: Code
permalink: /docs/en/components/code
---

## js

<!-- ====================================================================================== -->
{%- capture _code -%}
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
{%- endcapture -%}
{%- capture _code_rouge -%}
  {%- highlight javascript -%}
  {{_code}}
  {%- endhighlight -%}
{%- endcapture -%}
{%- capture _code_kramdown -%}
```javascript
{{ _code }}
```
{%- endcapture -%}
<!-- ====================================================================================== -->
{%- capture _titles -%}
rouge raw
<!-- split title -->
rouge render
<!-- split title -->
rouge html
{%- endcapture -%}
{%- capture _contents -%}
{%- highlight javascript -%}
{% raw %}{%- highlight javascript -%}{% endraw %}
{{ _code }}
{% raw %}{%- endhighlight -%}{% endraw %}
{%- endhighlight -%}
<!-- split content -->
{{ _code_rouge }}
<!-- split content -->
{%- highlight html -%}
{{ _code_rouge }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ====================================================================================== -->
{%- capture _titles -%}
kramdown raw
<!-- split title -->
kramdown render
<!-- split title -->
kramdown html
{%- endcapture -%}
{%- capture _contents -%}
{%- highlight javascript -%}
```javascript
{{ _code }}
```
{%- endhighlight -%}
<!-- split content -->
{{ _code_kramdown | markdownify }}
<!-- split content -->
{%- highlight html -%}
{{ _code_kramdown | markdownify }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ====================================================================================== -->

## html

<!-- ====================================================================================== -->
{%- capture _code -%}
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
{%- endcapture -%}
{%- capture _code_rouge -%}
  {%- highlight html -%}
  {{_code}}
  {%- endhighlight -%}
{%- endcapture -%}
{%- capture _code_kramdown -%}
```html
{{ _code }}
```
{%- endcapture -%}
<!-- ====================================================================================== -->
{%- capture _titles -%}
rouge raw
<!-- split title -->
rouge render
<!-- split title -->
rouge html
{%- endcapture -%}
{%- capture _contents -%}
{%- highlight html -%}
{% raw %}{%- highlight html -%}{% endraw %}
{{ _code }}
{% raw %}{%- endhighlight -%}{% endraw %}
{%- endhighlight -%}
<!-- split content -->
{{ _code_rouge }}
<!-- split content -->
{%- highlight html -%}
{{ _code_rouge }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ====================================================================================== -->
{%- capture _titles -%}
kramdown raw
<!-- split title -->
kramdown render
<!-- split title -->
kramdown html
{%- endcapture -%}
{%- capture _contents -%}
{%- highlight html -%}
```html
{{ _code }}
```
{%- endhighlight -%}
<!-- split content -->
{{ _code_kramdown | markdownify }}
<!-- split content -->
{%- highlight html -%}
{{ _code_kramdown | markdownify }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ====================================================================================== -->

## ruby

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

Related links 
+ Article about highlight of jekyll in this site - [see more]({%  link _markdown/highlight/rouge.md %})
+ Article about highlight from the official website - <https://jekyllrb.com/docs/liquid/tags/#code-snippet-highlighting>