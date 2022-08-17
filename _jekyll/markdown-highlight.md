---
layout: article
title: "Highlight"
permalink: /markdown/highlight
tags: ['guide', 'markdown', 'rouge', 'pygments']
date: 2022-06-21
---

## Rouge

> + [Jekyll Official website - Code snippet highlighting](https://jekyllrb.com/docs/liquid/tags/#code-snippet-highlighting).
> + [Rouge Official website - Supported Languages](https://github.com/rouge-ruby/rouge/blob/master/docs/Languages.md)
> + [Rouge Official website - API](https://rouge-ruby.github.io/docs/)
> + [Kramdown Official website - rouge options](https://kramdown.gettalong.org/syntax_highlighter/rouge.html)

{% raw %}
[Rouge](https://github.com/rouge-ruby/rouge) is Jekyll's default syntax highlighter. Out of the box, Rouge will be used to highlight text wrapped in the `{% highlight %}` template tags. The `{% highlight %}` tag provides minimal options: you can specify the language to use and whether to enable line numbers or not.
{% endraw %}

> + [Demo]({% link _docs/en/components/code.md %})
> + [Demo (Online)](http://rouge.jneen.net/v3.29.0/json/)
{:.info}

By default, Jekyll uses Rouge for highlight rendering. Therefor, no additional configuration is required.

<!-- ========================================================= -->
{%- capture _code_summary -%}
**The Order of Function Calling:**

1. <span class="info alert-compact">init</span>\
    `HighlightBlock.initialize`
2. <span class="info alert-compact">render</span>\
    `HighlightBlock.render` => `HighlightBlock.render_rouge`
{%- endcapture -%}
{%- assign _code_summary = _code_summary | markdownify -%}
<!-- ================================== -->
{% capture _markdown %}

`Jekyll` source [lib/jekyll/tags/highlight.rb](https://github.com/jekyll/jekyll/blob/master/lib/jekyll/tags/highlight.rb)

```ruby
module Jekyll
  module Tags
    class HighlightBlock < Liquid::Block

      def initialize(tag_name, markup, tokens)
        super
        if markup.strip =~ SYNTAX
          @lang = Regexp.last_match(1).downcase
          @highlight_options = parse_options(Regexp.last_match(2))
        else
          raise SyntaxError, <<~MSG
            Syntax Error in tag 'highlight' while parsing the following markup:
            #{markup}
            Valid syntax: highlight <lang> [linenos]
          MSG
        end
      end

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
    end
  end
end
```
{% endcapture %}
{%- assign _markdown = _markdown | markdownify -%}
{%- include article/generate-details.html summary=_code_summary code=_markdown -%}
<!-- ========================================================= -->

e.g.

<!-- ========================================================= -->
{%- capture _code_content -%}
var json = { name: "balabala", id: 123321 }
function show(str) {
  console.log(str);
}
show(json);
{%- endcapture -%}
<!-- ============================ -->
{%- capture _code_content_render -%}
{%- highlight javascript -%}{{ _code_content }}{%- endhighlight -%}
{%- endcapture -%}
<!-- ============================ -->
{%- capture _titles -%}
raw
<!-- split title -->
render
<!-- split title -->
html
{%- endcapture -%}
{%- capture _contents -%}
```liquid
{% raw %}{%- highlight javascript -%}{% endraw %}
{{ _code_content }}
{% raw %}{%- endhighlight -%}{% endraw %}
```
<!-- split content -->
{{ _code_content_render }}
<!-- split content -->
```html
{{ _code_content_render | strip }}
```
{%- endcapture -%}
{%- assign _contents = _contents | markdownify -%}
<!-- ============================ -->
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ========================================================= -->

### line-numbers

> + [Jekyll Official website - line number](https://jekyllrb.com/docs/liquid/tags/#line-numbers)

Add `linenos` and line numbers will appear after rendering.

```markdown{% raw %}
{% highlight ruby linenos %}
def foo
  puts 'foo'
end
{% endhighlight %}
{% endraw %}```

or modify `_config.yml`

```yml
kramdown:
  syntax_highlighter_opts:
    line_numbers: true
```

It is not recommended to open it, but to use javascript to realize it. (more flexible)
{:.error}

### Stylesheets for syntax highlighting

Stylesheets for syntax highlighting - <https://jekyllrb.com/docs/liquid/tags/#stylesheets-for-syntax-highlighting>

In order for the highlighting to show up, you’ll need to include a highlighting stylesheet. For Pygments or Rouge you can use a stylesheet for Pygments, you can find an example gallery [here](https://jwarby.github.io/jekyll-pygments-themes/languages/ruby.html) or from [its repository](https://github.com/jwarby/jekyll-pygments-themes).

Copy the CSS file (`native.css` for example) into your css directory and import the syntax highlighter styles into your `main.css`:

```scss
@import "native.css";
```

### integration Rouge

There are two ways to declare code blocks.
1. Jekyll => Rouge (`{% raw %}{%- highlight javascript -%}...{%- endhighlight -%}{% endraw %}`)
2. Jekyll => Kramdown => Rouge (```` ``` ... ``` ````)

#### Jekyll => Rouge

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

<!-- ========================================================= -->
{%- capture _code_summary -%}
Jekyll source code <a href='https://github.com/jekyll/jekyll/blob/master/lib/jekyll/tags/highlight.rb'>lib/jekyll/tags/highlight.rb</a>
{%- endcapture -%}
<!-- ======================== -->
{%- capture _markdown -%}
```ruby
module Jekyll
  module Tags
    class HighlightBlock < Liquid::Block
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
    end
  end
end
```
{%- endcapture -%}
{%- assign _markdown = _markdown | markdownify -%}
<!-- ======================== -->
{%- include article/generate-details.html summary=_code_summary code=_markdown -%}
<!-- ========================================================= -->

#### Jekyll => Kramdown => Rouge

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

<!-- ========================================================= -->
{%- capture _code_summary -%}
Kramdown source code <a href='https://github.com/gettalong/kramdown/blob/master/lib/kramdown/converter/syntax_highlighter/rouge.rb'>lib/kramdown/converter/syntax_highlighter/rouge.rb</a>
{%- endcapture -%}
<!-- ========================= -->
{%- capture _markdown -%}
```ruby
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
```
{%- endcapture -%}
{%- assign _code = _code | markdownify -%}
<!-- ========================= -->
{%- include article/generate-details.html summary=_code_summary code=_code -%}
<!-- ========================================================= -->

## Coderay
{:#Coderay}

> + [Jekyll Official website - Syntax Highlighting (CodeRay)](https://jekyllrb.com/docs/configuration/markdown/#syntax-highlighting-coderay)
> + [Kramdown Official website - Syntax Highlighting (CodeRay)](https://github.com/kramdown/syntax-coderay)

[CodeRay](http://coderay.rubychan.de/) is Jekyll Highlighting Parser, but it's off by default. (use rouge by default)

###  GET START

The following configuration is required to open it.

`Gemfile`

```ruby
gem "kramdown-syntax-coderay"
```

`_config.yml`

```yml
highlighter: coderay
# or 
kramdown:
  syntax_highlighter: coderay
```

<!-- ========================================================= -->
{%- capture _titles -%}
raw
<!-- split title -->
html
{%- endcapture -%}
{%- capture _contents -%}
{%- highlight liquid -%}
{% raw %}{%- highlight javascript -%}{% endraw %}
// render before
var json = { name: "balabala", id: 123321 }
function show(str) {
  console.log(str);
}
show(json);
{% raw %}{%- endhighlight -%}{% endraw %}
{%- endhighlight -%}
<!-- split content -->
{%- highlight html -%}
// render result
<div class="language-js highlighter-coderay"><div class="CodeRay">
  <div class="code"><pre>
    <span class="line-numbers"><a href="#n1" name="n1">1</a></span><span style="color:#080;font-weight:bold">var</span> json = { <span style="color:#606">name</span>: <span style="background-color:hsla(0,100%,50%,0.05)"><span style="color:#710">&quot;</span><span style="color:#D20">balabala</span><span style="color:#710">&quot;</span></span>, <span style="color:#606">id</span>: <span style="color:#00D">123321</span> }
    <span class="line-numbers"><a href="#n2" name="n2">2</a></span><span style="color:#080;font-weight:bold">function</span> <span style="color:#06B;font-weight:bold">show</span>(str) {
    <span class="line-numbers"><a href="#n3" name="n3">3</a></span>  console.log(str);
    <span class="line-numbers"><a href="#n4" name="n4">4</a></span>}
    <span class="line-numbers"><a href="#n5" name="n5">5</a></span>show(json);
  </pre></div>
</div></div>
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ========================================================= -->

### Config Priority

default settings (source code [kramdown_parser.rb](https://github.com/jekyll/jekyll/blob/master/lib/jekyll/converters/markdown/kramdown_parser.rb) in [jekyll][jekyll-github])

```ruby
CODERAY_DEFAULTS = {
  "css"               => "style",
  "bold_every"        => 10,
  "line_numbers"      => "inline",
  "line_number_start" => 1,
  "tab_width"         => 4,
  "wrap"              => "div",
}.freeze
```

```yml
highlighter: # default rouge
kramdown: # default {}
  syntax_highlighter: # default nil
  syntax_highlighter_opts: # default {}
    default_lang: # default plaintext
    # guess_lang: # same as site.guess_lang
  coderay: # default {}
  show_warnings: 
  input: GFM
  guess_lang: 
```

<!-- ========================================================= -->
{%- capture _code_summary -%}
source code <a href='https://github.com/jekyll/jekyll/blob/master/lib/jekyll/converters/markdown/kramdown_parser.rb'>lib/jekyll/converters/markdown/kramdown_parser.rb</a>
{%- endcapture -%}
{% capture _markdown %}
```ruby
# config[kramdown][syntax_highlighter] >
#   config[kramdown][enable_coderay] >
#   config[highlighter]
# Where `enable_coderay` is now deprecated because Kramdown
# supports Rouge now too.
def highlighter
  return @highlighter if @highlighter

  if @config["syntax_highlighter"]
    return @highlighter = @config[
      "syntax_highlighter"
    ]
  end

  @highlighter = if @config.key?("enable_coderay") && @config["enable_coderay"]
                    Jekyll::Deprecator.deprecation_message(
                      "You are using 'enable_coderay', " \
                      "use syntax_highlighter: coderay in your configuration file."
                    )

                    "coderay"
                  else
                    @main_fallback_highlighter
                  end
end

def initialize(config)
  @main_fallback_highlighter = config["highlighter"] || "rouge"
  @config = config["kramdown"] || {}
  @highlighter = nil
  setup
  load_dependencies
end
```
{% endcapture %}
{%- assign _markdown = _markdown | markdownify -%}
{%- include article/generate-details.html summary=_code_summary code=_markdown -%}
<!-- ========================================================= -->

## Pygments
{:#Pygments}

Using [Pygments](https://pygments.org/) has been deprecated and is not supported in Jekyll 4; the configuration setting `highlighter: pygments` now automatically falls back to using Rouge which is written in Ruby and 100% compatible with stylesheets for Pygments.
{: .error}

## Compare VS: rouge, conderay

> + [Website "Awesome Ruby" - compare-rouge-vs-coderay](https://ruby.libhunt.com/compare-rouge-vs-coderay)
> + [Website "Redmine" - List of languages supported by Rouge and CodeRay](https://www.redmine.org/issues/24681#note-46)

Current syntax highlighter CodeRay does not support popular languages such as C#, Visual Basic, Objective C, Swift, ... and so on. Unfortunately the development of CodeRay is not so active now, it is difficult to expect that CodeRay will support those languages.

On the contrary, [Rouge][ruge-github] supports [100+ languages](https://github.com/rouge-ruby/rouge/wiki/List-of-supported-languages-and-lexers).

> Syntax highlighter: replace CodeRay with Rouge - <https://www.redmine.org/issues/24681>

**summary**

[Coderay](#Coderay) (few languages support) and [Pygments](#Pygments) (Jekyll is no longer supported) are optional. Therefore, Rouge is the best choice.

---

> Related Links
> + [Github Docs - Github - Syntax highlight](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks)
> + [Github Docs - Github Page - Syntax highlight](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll#syntax-highlighting)