---
layout: article
title: Code
permalink: /docs/en/components/code
---

By default, Jekyll uses [Kramdown]({% link _markdown/kramdown/kramdown.md %}) to render markdown file, while Kramdown uses [Rouge]({% link _markdown/highlight/rouge.md %}) to highlight code.

So There are two ways to declare code blocks.

<!---

ol li 

->
<!-- ========================================================= -->
{%- capture ol_li1 -%}
`kramdown => rouge => highlight css`\
in this way, the code block is wrapped by two line breaking ```` ``` ```` symbols.
  
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
{%- endcapture -%}
<!-- ========================================================= -->
{%- capture _code_summary -%}
source <a href='https://github.com/gettalong/kramdown/blob/master/lib/kramdown/converter/syntax_highlighter/rouge.rb'>lib/kramdown/converter/syntax_highlighter/rouge.rb</a>
{%- endcapture -%}
{%- capture _markdown -%}
def self.call(converter, text, lang, type, call_opts)
  opts = options(converter, type)
  call_opts[:default_lang] = opts[:default_lang]
  return nil unless lang || opts[:default_lang] || opts[:guess_lang]

  lexer = ::Rouge::Lexer.find_fancy(lang || opts[:default_lang], text)
  return nil if opts[:disable] || !lexer || (lexer.tag == "plaintext" && !opts[:guess_lang])

  opts[:css_class] ||= 'highlight' # For backward compatibility when using Rouge 2.0
  formatter = formatter_class(opts).new(opts)
  formatter.format(lexer.lex(text))
end
...
def self.formatter_class(opts = {})
  case formatter = opts[:formatter]
  when Class
    formatter
  when /\A[[:upper:]][[:alnum:]_]*\z/
    ::Rouge::Formatters.const_get(formatter, false)
  else
    # Available in Rouge 2.0 or later
    ::Rouge::Formatters::HTMLLegacy
  end
rescue NameError
  # Fallback to Rouge 1.x
  ::Rouge::Formatters::HTML
end
{%- endcapture -%}
{%- capture _code -%}
{%- highlight ruby -%}
{{ _markdown }}
{%- endhighlight -%}
{%- endcapture -%}
{%- capture ol_li1_src -%}
  {%- include article/generate-details.html summary=_code_summary code=_code -%}
{%- endcapture -%}
<!-- ========================================================= -->
<!-- ========================================================= -->
{%- capture ol_li2 -%}
`tag => rouge => highlight css`\
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
{%- endcapture -%}
<!-- ========================================================= -->
{%- capture _code_summary -%}
source <a href='https://github.com/jekyll/jekyll/blob/master/lib/jekyll/tags/highlight.rb'>lib/jekyll/tags/highlight.rb</a>
{%- endcapture -%}
{%- capture _markdown -%}
...
def render(context)
  prefix = context["highlighter_prefix"] || ""
  suffix = context["highlighter_suffix"] || ""
  code = super.to_s.gsub(LEADING_OR_TRAILING_LINE_TERMINATORS, "")

  output =
    case context.registers[:site].highlighter
    when "rouge"
      render_rouge(code)
    when "pygments"
      render_pygments(code, context)
    else
      render_codehighlighter(code)
    end

  rendered_output = add_code_tag(output)
  prefix + rendered_output + suffix
end
...
def render_pygments(code, _context)
  Jekyll.logger.warn "Warning:", "Highlight Tag no longer supports rendering with Pygments."
  Jekyll.logger.warn "", "Using the default highlighter, Rouge, instead."
  render_rouge(code)
end

def render_rouge(code)
  require "rouge"
  formatter = ::Rouge::Formatters::HTML.new
  if @highlight_options[:linenos]
    formatter = ::Rouge::Formatters::HTMLTable.new(
      formatter,
      {
        :css_class    => "highlight",
        :gutter_class => "gutter",
        :code_class   => "code",
      }
    )
  end
  lexer = ::Rouge::Lexer.find_fancy(@lang, code) || Rouge::Lexers::PlainText
  formatter.format(lexer.lex(code))
end
...
{%- endcapture -%}
{%- capture _code -%}
{%- highlight ruby -%}
{{ _markdown }}
{%- endhighlight -%}
{%- endcapture -%}
{%- capture ol_li2_src -%}
  {%- include article/generate-details.html summary=_code_summary code=_code -%}
{%- endcapture -%}
<!-- ========================================================= -->


<ol>
  <li>
  {{ ol_li1 | markdownify }}
  {{ ol_li1_src }}
  </li>
  <li>
  {{ ol_li2 | markdownify }}
  {{ ol_li2_src }}
  </li>
</ol>



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
+ Article about highlight of jekyll in this site - <{%  link _markdown/highlight/rouge.md %}>
+ Article about highlight from the official website - <https://jekyllrb.com/docs/liquid/tags/#code-snippet-highlighting>