---
layout: article
permalink: /markdown/highlight/rouge
title: Rouge
date: 2022-06-21
---

[jekyll-github]: https://github.com/jekyll/jekyll
[ruge-github]: https://github.com/rouge-ruby/rouge/blob/master/README.md

## Rouge

{% raw %}
[Rouge](https://github.com/rouge-ruby/rouge) is Jekyll's default syntax highlighter. Out of the box, Rouge will be used to highlight text wrapped in the `{% highlight %}` template tags. The `{% highlight %}` tag provides minimal options: you can specify the language to use and whether to enable line numbers or not. More information is available in the [Jekyll docs](https://jekyllrb.com/docs/liquid/tags/#code-snippet-highlighting).
{% endraw %}

> + Online preview - <http://rouge.jneen.net/v3.29.0/json/>
> + Supported Languages - <https://github.com/rouge-ruby/rouge/blob/master/docs/Languages.md>
> + Docs - <https://rouge-ruby.github.io/docs/>

### GET START

By default, Jekyll uses Rouge for highlight rendering. Therefor, no additional configuration is required.

<!-- ========================================================= -->
{%- capture _code_summary -%}
source <a href='https://github.com/jekyll/jekyll/blob/master/lib/jekyll/tags/highlight.rb'>lib/jekyll/tags/highlight.rb</a>
{%- endcapture -%}
{% capture _markdown %}
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
{% endcapture %}
{%- capture _code -%}
{%- highlight ruby -%}
{{ _markdown }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-details.html summary=_code_summary code=_code -%}
<!-- ========================================================= -->

All we need to do is use `{% raw %}{%- highlight javascript -%}...{%- endhighlight -%}{% endraw %}` surround the code.

<!-- ========================================================= -->
{%- capture _code_content -%}
var json = { name: "balabala", id: 123321 }
function show(str) {
  console.log(str);
}
show(json);
{%- endcapture -%}
{%- capture _code_content_render -%}
{%- highlight javascript -%}{{ _code_content }}{%- endhighlight -%}
{%- endcapture -%}
{%- capture _titles -%}
raw
<!-- split title -->
render
<!-- split title -->
html
{%- endcapture -%}
{%- capture _contents -%}
{%- highlight liquid -%}
{% raw %}{%- highlight javascript -%}{% endraw %}
{{ _code_content }}
{% raw %}{%- endhighlight -%}{% endraw %}
{%- endhighlight -%}
<!-- split content -->
{{ _code_content_render }}
<!-- split content -->
{%- highlight html -%}
{{ _code_content_render }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ========================================================= -->

#### line-numbers

Add `linenos` and line numbers will appear after rendering. see [here](https://jekyllrb.com/docs/liquid/tags/#line-numbers) for more.

```html
{% raw %}{%- highlight javascript linenos -%}
...
{%- endhighlight -%}{% endraw %}
```

or modify `_config.yml`

```yml
kramdown:
  syntax_highlighter_opts:
    line_numbers: true
```

<!-- ========================================================= -->
{%- capture _code_content -%}
var json = { name: "balabala", id: 123321 }
function show(str) {
  console.log(str);
}
show(json);
{%- endcapture -%}
{%- capture _code_content_render -%}
{%- highlight javascript linenos -%}
{{ _code_content }}
{%- endhighlight -%}
{%- endcapture -%}
{%- capture _titles -%}
raw
<!-- split title -->
render
<!-- split title -->
html
{%- endcapture -%}
{%- capture _contents -%}
{%- highlight liquid -%}
{% raw %}{%- highlight javascript -%}{% endraw %}
{{ _code_content }}
{% raw %}{%- endhighlight -%}{% endraw %}
{%- endhighlight -%}
<!-- split content -->

<!-- split content -->
{%- highlight html -%}
{{ _code_content_render }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ========================================================= -->

#### syntax_highlighter_opts

See [here](https://kramdown.gettalong.org/syntax_highlighter/rouge.html) for more Syntax Highlighting with Rouge.

### Stylesheets for syntax highlighting

Stylesheets for syntax highlighting - <https://jekyllrb.com/docs/liquid/tags/#stylesheets-for-syntax-highlighting>

In order for the highlighting to show up, you’ll need to include a highlighting stylesheet. For Pygments or Rouge you can use a stylesheet for Pygments, you can find an example gallery [here](https://jwarby.github.io/jekyll-pygments-themes/languages/ruby.html) or from [its repository](https://github.com/jwarby/jekyll-pygments-themes).

Copy the CSS file (`native.css` for example) into your css directory and import the syntax highlighter styles into your `main.css`:

```scss
@import "native.css";
```
