---
layout: article
permalink: /markdown/kramdown
date: 2022-06-20
---

[kramdown-github]: https://github.com/gettalong/kramdown
[jekyll-github]: https://github.com/jekyll/jekyll

Github - <https://github.com/gettalong/kramdown>

Jekyll Markdown Parser: Kramdown - <https://jekyllrb.com/docs/configuration/markdown/>

Options - <https://kramdown.gettalong.org/rdoc/Kramdown/Options.html>

> Custom Markdown Processors - <https://jekyllrb.com/docs/configuration/markdown/#custom-markdown-processors>

```yml
markdown: kramdown # options: kramdown (default), redcarpet
```

default config

source code [configuration.rb](https://github.com/jekyll/jekyll/blob/master/lib/jekyll/configuration.rb) in [jekyll][jekyll-github]

```ruby
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
```

config pickup

source code [markdown.rb](https://github.com/jekyll/jekyll/blob/master/lib/jekyll/converters/markdown.rb) in [jekyll][jekyll-github]

```ruby
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
```

reference kramdown parsercode 

source code [markdown.rb](https://github.com/jekyll/jekyll/blob/master/lib/jekyll/converters/markdown.rb) in [jekyll][jekyll-github]

```ruby
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
```

source code [kramdown/parser/kramdown.rb)](https://github.com/gettalong/kramdown/blob/master/lib/kramdown/parser/kramdown.rb) in [kramdown-github]

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

source code [kramdown_parser.rb](https://github.com/jekyll/jekyll/blob/master/lib/jekyll/converters/markdown/kramdown_parser.rb) in [jekyll][jekyll-github]

```ruby
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
```

