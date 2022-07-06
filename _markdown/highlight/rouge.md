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

line-numbers - <https://jekyllrb.com/docs/liquid/tags/#line-numbers>

Add `linenos` and line numbers will appear after rendering.

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

the result

```html
// render result
<figure class="highlight"><pre><code class="language-javascript" data-lang="javascript">
  <table class="rouge-table">
    <tbody>
      <tr>
        <td class="gutter gl"><pre class="lineno">1
2
3
4
5
</pre>
        </td>
        <td class="code">
          <pre><span class="kd">var</span> <span class="nx">json</span> <span class="o">=</span> <span class="p">{</span> <span class="na">name</span><span class="p">:</span> <span class="dl">"</span><span class="s2">balabala</span><span class="dl">"</span><span class="p">,</span> <span class="na">id</span><span class="p">:</span> <span class="mi">123321</span> <span class="p">}</span>
          <span class="kd">function</span> <span class="nx">show</span><span class="p">(</span><span class="nx">str</span><span class="p">)</span> <span class="p">{</span>
          <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">str</span><span class="p">);</span>
          <span class="p">}</span>
          <span class="nx">show</span><span class="p">(</span><span class="nx">json</span><span class="p">);</span></pre>
        </td>
      </tr>
    </tbody>
  </table>
</code></pre></figure>
```

#### Stylesheets for syntax highlighting

Stylesheets for syntax highlighting - <https://jekyllrb.com/docs/liquid/tags/#stylesheets-for-syntax-highlighting>

In order for the highlighting to show up, you’ll need to include a highlighting stylesheet. For Pygments or Rouge you can use a stylesheet for Pygments, you can find an example gallery [here](https://jwarby.github.io/jekyll-pygments-themes/languages/ruby.html) or from [its repository](https://github.com/jwarby/jekyll-pygments-themes).

Copy the CSS file (`native.css` for example) into your css directory and import the syntax highlighter styles into your `main.css`:

```scss
@import "native.css";
```

#### syntax_highlighter_opts

Syntax Highlighting With Rouge - <https://kramdown.gettalong.org/syntax_highlighter/rouge.html>

### Source

Source [highlight.rb](https://github.com/jekyll/jekyll/blob/master/lib/jekyll/tags/highlight.rb) in [Jekyll][jekyll-github]

```ruby
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
```

## Compare Rouge vs CodeRay

Compare-rouge-vs-conderay - <https://ruby.libhunt.com/compare-rouge-vs-coderay>

List of languages supported by Rouge and CodeRay - <https://www.redmine.org/issues/24681#note-46>

Current syntax highlighter CodeRay does not support popular languages such as C#, Visual Basic, Objective C, Swift, ... and so on. Unfortunately the development of CodeRay is not so active now, it is difficult to expect that CodeRay will support those languages.

On the contrary, [Rouge][ruge-github] supports [100+ languages](https://github.com/rouge-ruby/rouge/wiki/List-of-supported-languages-and-lexers).

> Syntax highlighter: replace CodeRay with Rouge - <https://www.redmine.org/issues/24681>

## CodeRay

[CodeRay](http://coderay.rubychan.de/) is Jekyll Highlighting Parser, but it's off by default. (use rouge by default)

### GET START

Syntax Highlighting (CodeRay) - <https://jekyllrb.com/docs/configuration/markdown/#syntax-highlighting-coderay>

kramdown-syntax-coderay docs - <https://github.com/kramdown/syntax-coderay>

The following configuration is required to open it.

`Gemfile`

```text
gem "kramdown-syntax-coderay"
```

`_config.yml`

```
highlighter: coderay
# or 
kramdown:
  syntax_highlighter: coderay
```

```html
// render before
{% raw %}{%- highlight javascript -%}
var json = { name: "balabala", id: 123321 }
function show(str) {
  console.log(str);
}
show(json);
{%- endhighlight -%}{% endraw %}

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
```

### Config Priority

source code [kramdown_parser.rb](https://github.com/jekyll/jekyll/blob/master/lib/jekyll/converters/markdown/kramdown_parser.rb) in [jekyll][jekyll-github]

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

### Source

source code [kramdown_parser.rb](https://github.com/jekyll/jekyll/blob/master/lib/jekyll/converters/markdown/kramdown_parser.rb) in [jekyll][jekyll-github]

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

## Pygments

Pygments - <https://pygments.org/>

Using Pygments has been deprecated and is not supported in Jekyll 4; the configuration setting `highlighter: pygments` now automatically falls back to using Rouge which is written in Ruby and 100% compatible with stylesheets for Pygments.
{: .error}