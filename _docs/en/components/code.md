---
layout: article
title: Code
permalink: /docs/en/components/code
---

By default, Jekyll uses [Kramdown]({% link _markdown/kramdown/kramdown.md %}) to render markdown file, while Kramdown uses [Rouge]({% link _markdown/highlight/rouge.md %}) to highlight code.

So There are two ways to declare code blocks.

1. `kramdown => rouge => highlight css`\
in this way, the code block is wrapped by two line breaking "{% raw %}```{% endraw %}" symbols.
  
    e.g.
  
    ``````markdown
    ```javascript
    code block
    ```
    ``````
  
    render 
    
    ```html
    <div class="language-javascript highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
      <span>code block</span>
    </code></pre></div></div>
    ```

2. `rouge => highlight css`\
in this way, the code block is wrapped by `{% raw %}{%- highlight javascript -%}...{%- endhighlight -%}{% endraw %}` .

    e.g.

    ```liquid
    {% raw %}{%- highlight javascript -%}{% endraw %}
    code block
    {% raw %}{%- endhighlight -%}{% endraw %}
    ``` 

    render

    ```html
    <figure class="highlight"><pre><code class="language-javascript" data-lang="javascript">
      <span>code block</span>
    </code></pre></figure>
    ```

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

Related links 
+ Article about highlight of jekyll in this site - todo
+ Article about highlight from the official website - <https://jekyllrb.com/docs/liquid/tags/#code-snippet-highlighting>