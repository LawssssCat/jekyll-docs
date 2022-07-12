---
layout: article
date: 2022-06-21
title: Plugins - Emoji
permalink: /plugins/emoji
---



<!-- more -->

## jemoji

[jemoji](https://github.com/jekyll/jemoji) is a GitHub-flavored Emoji plugin for Jekyll.

### Configuration

`Gemfile`

```
gem "jemoji", "~> 0.8"
```

`_config.yml`

```yml
plugins:
  - jemoji
```

### Examples

<!-- ===================================== -->
{%- capture _code -%}
Lorem ipsum dolor :smile: sit amet

Lorem ipsum dolor :custom: sit amet

Lorem ipsum dolor `:smile:` sit amet

Lorem ipsum dolor \:smile\: sit amet

Lorem ipsum dolor \:smile: sit amet

Lorem ipsum dolor :smile\: sit amet

[:tada:](/foo.html)

<a href="./foo:smile:bar.html">lipsum</a>

<div>
  Hello World `foo` :sparkles:
</div>
{%- endcapture -%}
<!-- ===================================== -->
{%- capture _titles -%}
raw
<!-- split title -->
render
{%- endcapture -%}
{%- capture _contents -%}
{%- highlight markdown -%}
{{ _code }}
{%- endhighlight -%}
<!-- split content -->
{%- highlight html -%}
{{ _code | markdownify }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ===================================== -->
<div class="info">
{{ _code | markdownify }}
</div>
<!-- ===================================== -->

## gfm_emojis

[gemoji](https://github.com/github/gemoji) library contains character information about native emojis.

<!-- ===================================== -->
{%- capture _code_summary -%}
source code <a href="https://github.com/kramdown/parser-gfm/blob/master/lib/kramdown/parser/gfm.rb">lib/kramdown/parser/gfm.rb</a> in <a href="https://github.com/kramdown/parser-gfm">parser-gfm</a>
{%- endcapture -%}
{%- capture _code -%}
```ruby
EXTENSIONS = {
  emoji: 'gfm/emoji_parser',
}.freeze

def initialize(source, options)
  ...
  return unless @options[:gfm_emojis]

  self.class.load_extension(:emoji) && @span_parsers.unshift(:emoji)
end
```
{%- endcapture -%}
{%- assign _code = _code | markdownify -%}
{%- include article/generate-details.html summary=_code_summary code=_code -%}
<!-- ===================================== -->

### Configuration

`Gemfile`

```text
gem "gemoji", "~> 3.0"
```

`_config.yml`

```yml
kramdown: 
  gfm_emojis: true
```
