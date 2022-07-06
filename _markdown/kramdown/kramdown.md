---
layout: article
permalink: /markdown/kramdown
date: 2022-06-20
---

[kramdown-github]: https://github.com/gettalong/kramdown
[jekyll-github]: https://github.com/jekyll/jekyll

[Kramdown](https://kramdown.gettalong.org/index.html) is the default Markdown renderer for Jekyll.

> + Github - <https://github.com/gettalong/kramdown>

You can refer to the following for setting options.

> + Jekyll Markdown Parser: Kramdown - <https://jekyllrb.com/docs/configuration/markdown/>
> + Kramdown Options - <https://kramdown.gettalong.org/rdoc/Kramdown/Options.html>

```yml
markdown: kramdown # options: kramdown (default), redcarpet
```

{%- capture _summary -%}
source code <a href='https://github.com/jekyll/jekyll/blob/master/lib/jekyll/converters/markdown.rb'>lib/jekyll/converters/markdown.rb</a> and <a href='https://github.com/gettalong/kramdown/blob/master/lib/kramdown/parser/kramdown.rb'>lib/kramdown/parser/kramdown.rb</a>
{%- endcapture -%}
{%- capture _code -%}
{%- highlight ruby -%}
# RuboCop does not allow reader methods to have names starting with `get_`
# To ensure compatibility, this check has been disabled on this method
#
# rubocop:disable Naming/AccessorMethodName
def get_processor
  case @config["markdown"].downcase
  when "kramdown" then KramdownParser.new(@config)
  else
    custom_processor
  end
end
...
def initialize(source, options = {})
  JekyllDocument.setup(options)

  @options = JekyllDocument.options
  @root, @warnings = JekyllDocument.parser.parse(source, @options)
end
...
def setup(options)
  ...
  @parser  ||= begin
    parser_name = (@options[:input] || "kramdown").to_s
    parser_name = parser_name[0..0].upcase + parser_name[1..-1]
    try_require("parser", parser_name)

    if Parser.const_defined?(parser_name)
      Parser.const_get(parser_name)
    else
      raise Kramdown::Error, "kramdown has no parser to handle the specified " \
                              "input format: #{@options[:input]}"
    end
  end
  ...
end
...
def try_require(type, name)
  require "kramdown/#{type}/#{Utils.snake_case(name)}"
rescue LoadError
  false
end
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-details.html summary=_summary code=_code -%}

## default config

```yml
"kramdown"
  "auto_ids"      : true
  "toc_levels"    : (1..6).to_a
  "entity_output" : "as_char"
  "smart_quotes"  : "lsquo,rsquo,ldquo,rdquo"
  "input"         : "GFM"
  "hard_wrap"     : false
  "guess_lang"    : true
  "footnote_nr"   : 1
  "show_warnings" : false
```

{%- capture _summary -%}
source code <a href='https://github.com/jekyll/jekyll/blob/master/lib/jekyll/configuration.rb'>configuration.rb</a>
{%- endcapture -%}
{%- capture _code -%}
{%- highlight ruby -%}
DEFAULTS = {
  ...
  "kramdown"            => {
    "auto_ids"      => true,
    "toc_levels"    => (1..6).to_a,
    "entity_output" => "as_char",
    "smart_quotes"  => "lsquo,rsquo,ldquo,rdquo",
    "input"         => "GFM",
    "hard_wrap"     => false,
    "guess_lang"    => true,
    "footnote_nr"   => 1,
    "show_warnings" => false,
  },
}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-details.html summary=_summary code=_code -%}

## GFM (GitHub Flavored Markdown)

By default, kramdown uses the GitHub Flavored Markdown ([GFM](https://github.com/kramdown/parser-gfm)) dialect to converts Markdown documents to HTML.

See [here]({% link _markdown/kramdown/gfm.md %}) for more.

## Advanced Kramdown Options

Kramdown supports a variety of other relatively advanced options such as `header_offset` and `smart_quotes`. These are documented in the [Kramdown configuration documentation](https://kramdown.gettalong.org/options.html) and can be added to your Kramdown config like this:

```yml
kramdown:
  header_offset: 2
```

There are several unsupported kramdown options\
Please note that Jekyll uses Kramdown's HTML converter. Kramdown options used only by other converters, such as remove_block_html_tags (used by the RemoveHtmlTags converter), will not work.
{: .error}

### show_warnings

```yml
kramdown:
  show_warnings: true
```

{%- capture _summary -%}
source code <a href='https://github.com/jekyll/jekyll/blob/master/lib/jekyll/converters/markdown/kramdown_parser.rb'>lib/jekyll/converters/markdown/kramdown_parser.rb</a>
{%- endcapture -%}
{%- capture _code -%}
{%- highlight ruby -%}
def convert(content)
  document = Kramdown::JekyllDocument.new(content, @config)
  html_output = document.to_html
  if @config["show_warnings"]
    document.warnings.each do |warning|
      Jekyll.logger.warn "Kramdown warning:", warning
    end
  end
  html_output
end
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-details.html summary=_summary code=_code -%}
