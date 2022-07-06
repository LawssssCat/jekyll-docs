---
layout: article
permalink: /markdown/highlight/coderay
title: CodeRay
---

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
{% endcapture %}
{%- capture _code -%}
{%- highlight ruby -%}
{{ _markdown }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-details.html summary=_code_summary code=_code -%}
<!-- ========================================================= -->
