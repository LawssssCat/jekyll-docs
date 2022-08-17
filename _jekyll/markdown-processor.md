---
layout: article
title: "Renderer"
permalink: /markdown/processor
tags: ['guide', 'markdown', 'kramdown', 'redcarpet']
author: foo
date: 2022-06-20
---

## Kramdown

[Kramdown](https://kramdown.gettalong.org/index.html) ([Github](https://github.com/gettalong/kramdown)) is the default Markdown renderer for Jekyll.

```yml
markdown: kramdown # options: kramdown (default), redcarpet
```
{:.no-code-header}

<!-- ============================================================================ -->
{%- capture _summary -%}
**The Order of Function Calling:**

1. <span class="info alert-compact">Jekyll markdown init</span>
    1. (jekyll - markdown) `Converter.get_processor` =>
    1. (jekyll - markdown - parser) `KramdownParser.new`
1. <span class="info alert-compact">Jekyll markdown convert</span>
    1. (jekyll - markdown) `Converter.convert` =>
    1. (jekyll - markdown - parser) `KramdownParser.convert` =>
    1. (jekyll - markdown - parser) `JekyllDocument.new` =>
    1. (jekyll - markdown - parser) `JekyllDocument.try_require("parser", "Kramdown")` =>
    1. (jekyll - markdown - parser) `require "kramdown/parser/kramdown"` =>\
      <span class="info alert-compact">kramdown init and parse</span> =>\
      `Parser.const_get("Kramdown")` =>\
      `JekyllDocument.parser.parse(source, @options)` =>
    1. (jekyll - markdown - parser) `JekyllDocument.to_html`
1. <span class="info alert-compact">kramdown init and parse</span>
    1. (kramdown) `Kramdown:Parser:Kramdown.initialize` =>
    2. (kramdown) `Kramdown:Parser:Kramdown.parse`
{%- endcapture -%}
{%- assign _summary = _summary | markdownify -%}
<!-- ======================= -->
{%- capture _code -%}

<div class='warning' markdown='1'>
`Jekyll` Source Code: [lib/jekyll/converters/markdown.rb](https://github.com/jekyll/jekyll/blob/master/lib/jekyll/converters/markdown.rb)
+ Jekyll - Converter - Markdown
</div>

```ruby
module Jekyll
  module Converters
    # Markdown converter.
    # For more info on converters see https://jekyllrb.com/docs/plugins/converters/
    class Markdown < Converter
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

      # Logic to do the content conversion.
      #
      # content - String content of file (without front matter).
      #
      # Returns a String of the converted content.
      def convert(content)
        setup
        @cache.getset(content) do
          @parser.convert(content)
        end
      end
    end
  end
end
```

<div class='warning' markdown='1'>
`Jekyll` Source Code: [lib/jekyll/converters/markdown/kramdown_parser.rb](https://github.com/jekyll/jekyll/blob/master/lib/jekyll/converters/markdown/kramdown_parser.rb)
+ Kramdown - JekyllDocument
+ Jekyll - Converters - Markdown - KramdownParser

Ruby API:
+ [const_get](https://ruby-doc.org/core-2.5.0/Module.html#method-i-const_get)
</div>

```ruby
module Kramdown
  # A Kramdown::Document subclass meant to optimize memory usage from initializing
  # a kramdown document for parsing.
  #
  # The optimization is by using the same options Hash (and its derivatives) for
  # converting all Markdown documents in a Jekyll site.
  class JekyllDocument < Document
    class << self
      # The implementation is basically the core logic in +Kramdown::Document#initialize+
      #
      # rubocop:disable Naming/MemoizedInstanceVariableName
      def setup(options)
        @cache ||= {}

        # reset variables on a subsequent set up with a different options Hash
        unless @cache[:id] == options.hash
          @options = @parser = nil
          @cache[:id] = options.hash
        end

        @options ||= Options.merge(options).freeze
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
      end

      private

      def try_require(type, name)
        require "kramdown/#{type}/#{Utils.snake_case(name)}"
      rescue LoadError
        false
      end
    end

    def initialize(source, options = {})
      JekyllDocument.setup(options)

      @options = JekyllDocument.options
      @root, @warnings = JekyllDocument.parser.parse(source, @options)
    end

    # Use Kramdown::Converter::Html class to convert this document into HTML.
    #
    # The implementation is basically an optimized version of core logic in
    # +Kramdown::Document#method_missing+ from kramdown-2.1.0.
    def to_html
      output, warnings = Kramdown::Converter::Html.convert(@root, @options)
      @warnings.concat(warnings)
      output
    end

  end
end

module Jekyll
  module Converters
    class Markdown
      class KramdownParser
        CODERAY_DEFAULTS = {
          "css"               => "style",
          "bold_every"        => 10,
          "line_numbers"      => "inline",
          "line_number_start" => 1,
          "tab_width"         => 4,
          "wrap"              => "div",
        }.freeze

        def initialize(config)
          @main_fallback_highlighter = config["highlighter"] || "rouge"
          @config = config["kramdown"] || {}
          @highlighter = nil
          setup
          load_dependencies
        end

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

      end
    end
  end
end
```

<div class='warning' markdown='1'>
`Kramdown` Source Code: [lib/kramdown/parser/kramdown.rb](https://github.com/gettalong/kramdown/blob/master/lib/kramdown/parser/kramdown.rb)
</div>

```ruby
require 'strscan'
require 'stringio'
require 'kramdown/parser'

module Kramdown

  module Parser

    # Used for parsing a document in kramdown format.
    #
    # If you want to extend the functionality of the parser, you need to do the following:
    #
    # * Create a new subclass
    # * add the needed parser methods
    # * modify the @block_parsers and @span_parsers variables and add the names of your parser
    #   methods
    #
    # Here is a small example for an extended parser class that parses ERB style tags as raw text if
    # they are used as span-level elements (an equivalent block-level parser should probably also be
    # made to handle the block case):
    #
    #   require 'kramdown/parser/kramdown'
    #
    #   class Kramdown::Parser::ERBKramdown < Kramdown::Parser::Kramdown
    #
    #      def initialize(source, options)
    #        super
    #        @span_parsers.unshift(:erb_tags)
    #      end
    #
    #      ERB_TAGS_START = /<%.*?%>/
    #
    #      def parse_erb_tags
    #        @src.pos += @src.matched_size
    #        @tree.children << Element.new(:raw, @src.matched)
    #      end
    #      define_parser(:erb_tags, ERB_TAGS_START, '<%')
    #
    #   end
    #
    # The new parser can be used like this:
    #
    #   require 'kramdown/document'
    #   # require the file with the above parser class
    #
    #   Kramdown::Document.new(input_text, :input => 'ERBKramdown').to_html
    #
    class Kramdown < Base
      
      # Create a new Kramdown parser object with the given +options+.
      def initialize(source, options)
        super

        reset_env

        @alds = {}
        @footnotes = {}
        @link_defs = {}
        update_link_definitions(@options[:link_defs])

        @block_parsers = [:blank_line, :codeblock, :codeblock_fenced, :blockquote, :atx_header,
                          :horizontal_rule, :list, :definition_list, :block_html, :setext_header,
                          :block_math, :table, :footnote_definition, :link_definition,
                          :abbrev_definition, :block_extensions, :eob_marker, :paragraph]
        @span_parsers =  [:emphasis, :codespan, :autolink, :span_html, :footnote_marker, :link,
                          :smart_quotes, :inline_math, :span_extensions, :html_entity,
                          :typographic_syms, :line_break, :escaped_chars]

        @span_pattern_cache ||= Hash.new { |h, k| h[k] = {} }
      end

      # The source string provided on initialization is parsed into the @root element.
      def parse
        configure_parser
        parse_blocks(@root, adapt_source(source))
        update_tree(@root)
        correct_abbreviations_attributes
        replace_abbreviations(@root)
        @footnotes.each do |_name, data|
          update_tree(data[:content])
          replace_abbreviations(data[:content])
        end
        footnote_count = 0
        @footnotes.each do |name, data|
          (footnote_count += 1; next) if data.key?(:marker)
          line = data[:content].options[:location]
          warning("Footnote definition for '#{name}' on line #{line} is unreferenced - ignoring")
        end
        @root.options[:footnote_count] = footnote_count
      end

      # Adapt the object to allow parsing like specified in the options.
      def configure_parser
        @parsers = {}
        (@block_parsers + @span_parsers).each do |name|
          if self.class.has_parser?(name)
            @parsers[name] = self.class.parser(name)
          else
            raise Kramdown::Error, "Unknown parser: #{name}"
          end
        end
        @span_start, @span_start_re = span_parser_regexps
      end
    end
  end

end
```
{%- endcapture -%}
{%- assign _code = _code | markdownify -%}
<!-- ======================= -->
{%- include article/generate-details.html summary=_summary code=_code -%}
<!-- ============================================================================ -->

### Syntax

> + [Kramdown Official website - Syntax Quick-Reference and Demo](https://kramdown.gettalong.org/quickref.html) - ⭐️
> + [Kramdown Official website - Syntax Detailed-Behavior](https://kramdown.gettalong.org/syntax.html) - ⭐️

e.g.\
[IAL(Inline Attribute Lists)](https://kramdown.gettalong.org/syntax.html#block-ials)

<!-- ============================================================================ -->
{%- capture _markdown -%}
{::comment}
This text is completely ignored by kramdown - a comment in the text.
{:/comment}

Do you see {::comment}this text{:/comment}?
{::comment}some other comment{:/}

{::options key="val" /}

This *is*{:.underline} some `code`{:#id}{:.class}.
A [link](test.html){:rel='something'} and some **tools**{:.tools}.

> A blockquote{:rel='something'} with a title{:.tools}
{:title="The blockquote title"}
{: #myid}

{:.ruby}
    Some code here

This *is italic*{::}*marked*{:.special} text
{%- endcapture -%}
<!-- ======================= -->
{%- capture _titles -%}
markdown
<!-- split title -->
html
{%- endcapture -%}
{%- capture _contents -%}
```markdown
{{ _markdown }}
```
<!-- split content -->
```html
{{ _markdown | markdownify }}
```
{%- endcapture -%}
{%- assign _contents = _contents | markdownify -%}
<!-- ======================= -->
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ============================================================================ -->

### Options

> + [Jekyll Official website - Configuration of markdown](https://jekyllrb.com/docs/configuration/markdown/#kramdown)
> + [Kramdown Official website - API](https://kramdown.gettalong.org/rdoc/Kramdown/Options.html)
> + [Kramdown Official website - API Docs](https://kramdown.gettalong.org/options.html) - ⭐️

<!-- ============================================================================ -->
{%- capture _summary -%}
**default options:**
{%- endcapture -%}
{%- assign _summary = _summary | markdownify -%}
<!-- ======================= -->
{%- capture _code -%}
`Jekyll` source code [lib/jekyll/configuration.rb](https://github.com/jekyll/jekyll/blob/master/lib/jekyll/configuration.rb)

```ruby
module Jekyll
  class Configuration < Hash
    DEFAULTS = {
      # Conversion
      "markdown"            => "kramdown",
      "highlighter"         => "rouge",
      "lsi"                 => false,
      "excerpt_separator"   => "\n\n",
      "incremental"         => false,

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
  end
end
```
{%- endcapture -%}
{%- assign _code = _code | markdownify -%}
<!-- ======================= -->
{%- include article/generate-details.html summary=_summary code=_code open=true -%}
<!-- ============================================================================ -->

There are several unsupported kramdown options\
Please note that Jekyll uses Kramdown's HTML converter. Kramdown options used only by other converters, such as remove_block_html_tags (used by the RemoveHtmlTags converter), will not work.
{: .error}

### GFM (GitHub Flavored Markdown)
{:#gfm}

This is a parser for kramdown that converts Markdown documents in the [GitHub Flavored Markdown (GFM)](https://github.com/kramdown/parser-gfm) dialect to HTML.

<div class='info' markdown='1'>
By default, Jekyll uses the [GitHub Flavored Markdown (GFM) processor](https://github.com/kramdown/parser-gfm) for Kramdown. (Specifying `input: GFM` is fine, but redundant.) 

```yml
kramdown:
  input: GFM
```
</div>

<!-- ========================================================= -->
{%- capture _summary -%}
**The Order of Function Calling:**
1. <span class="info alert-compact">load dependency</span>\
(Jekyll) `KramdownParser.initialize` => `KramdownParser.load_dependencies` => `require "kramdown-parser-gfm" if @config["input"] == "GFM"`
1. <span class="info alert-compact">implementation Parser</span>\
(GFM) `class GFM < Kramdown::Parser::Kramdown`
1. <span class="info alert-compact">use Parser</span>\
`Kramdown::Document.new(input_text, :input => 'GFM').to_html`
{%- endcapture -%}
{%- assign _summary = _summary | markdownify -%}
<!-- ======================== -->
{%- capture _code -%}

`Jekyll` source code [lib/jekyll/converters/markdown/kramdown_parser.rb](https://github.com/jekyll/jekyll/blob/master/lib/jekyll/converters/markdown/kramdown_parser.rb)

```ruby
module Jekyll
  module Converters
    class Markdown
      class KramdownParser
        CODERAY_DEFAULTS = {
          "css"               => "style",
          "bold_every"        => 10,
          "line_numbers"      => "inline",
          "line_number_start" => 1,
          "tab_width"         => 4,
          "wrap"              => "div",
        }.freeze

        def initialize(config)
          @main_fallback_highlighter = config["highlighter"] || "rouge"
          @config = config["kramdown"] || {}
          @highlighter = nil
          setup
          load_dependencies
        end

        def load_dependencies
          require "kramdown-parser-gfm" if @config["input"] == "GFM"

          if highlighter == "coderay"
            Jekyll::External.require_with_graceful_fail("kramdown-syntax-coderay")
          end

          # `mathjax` engine is bundled within kramdown-2.x and will be handled by
          # kramdown itself.
          if (math_engine = @config["math_engine"]) && math_engine != "mathjax"
            Jekyll::External.require_with_graceful_fail("kramdown-math-#{math_engine}")
          end
        end
      end
    end
  end
end
```

`parser-gfm` source code [lib/kramdown-parser-gfm.rb](https://github.com/kramdown/parser-gfm/blob/master/lib/kramdown-parser-gfm.rb)

```ruby
require_relative 'kramdown/parser/gfm'
```

`parser-gfm` source code [lib/kramdown/parser/gfm.rb](https://github.com/kramdown/parser-gfm/blob/master/lib/kramdown/parser/gfm.rb)

```ruby
require 'kramdown/options'
require 'kramdown/parser/kramdown'

require_relative 'gfm/options'
require_relative 'gfm_version'

module Kramdown
  module Parser

    # This class provides a parser implementation for the GFM dialect of Markdown.
    class GFM < Kramdown::Parser::Kramdown

    ...

    end
  end
end
```

`Kramdown` Source Code: [lib/kramdown/parser/kramdown.rb](https://github.com/gettalong/kramdown/blob/master/lib/kramdown/parser/kramdown.rb)

```ruby
require 'strscan'
require 'stringio'
require 'kramdown/parser'

module Kramdown

  module Parser

    # Used for parsing a document in kramdown format.
    #
    # If you want to extend the functionality of the parser, you need to do the following:
    #
    # * Create a new subclass
    # * add the needed parser methods
    # * modify the @block_parsers and @span_parsers variables and add the names of your parser
    #   methods
    #
    # Here is a small example for an extended parser class that parses ERB style tags as raw text if
    # they are used as span-level elements (an equivalent block-level parser should probably also be
    # made to handle the block case):
    #
    #   require 'kramdown/parser/kramdown'
    #
    #   class Kramdown::Parser::ERBKramdown < Kramdown::Parser::Kramdown
    #
    #      def initialize(source, options)
    #        super
    #        @span_parsers.unshift(:erb_tags)
    #      end
    #
    #      ERB_TAGS_START = /<%.*?%>/
    #
    #      def parse_erb_tags
    #        @src.pos += @src.matched_size
    #        @tree.children << Element.new(:raw, @src.matched)
    #      end
    #      define_parser(:erb_tags, ERB_TAGS_START, '<%')
    #
    #   end
    #
    # The new parser can be used like this:
    #
    #   require 'kramdown/document'
    #   # require the file with the above parser class
    #
    #   Kramdown::Document.new(input_text, :input => 'ERBKramdown').to_html
    #
    class Kramdown < Base

    ...  

    end
  end

end
```

`Jekyll` source code [lib/jekyll/converters/markdown/kramdown_parser.rb](https://github.com/jekyll/jekyll/blob/master/lib/jekyll/converters/markdown/kramdown_parser.rb)

```ruby
module Kramdown
  class JekyllDocument < Document
    def setup(options)
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
  end
end
```
{%- endcapture -%}
{%- assign _code = _code | markdownify -%}
<!-- ======================== -->
{%- include article/generate-details.html summary=_summary code=_code -%}
<!-- ========================================================= -->

These [options](https://github.com/kramdown/parser-gfm#options) can be used directly in your Kramdown Jekyll config, like this:

```yml
kramdown:
  # You can also change the processor used by Kramdown (as specified for the input key in the Kramdown RDoc). For example, to use the non-GFM Kramdown processor in Jekyll, add the following to your configuration.
  input: GFM # redundant. default is GFM. options: GFM, Kramdown, SmartyPants
  # Insert HTML <br /> tags inside paragraphs where the original Markdown document had newlines (by default, Markdown ignores these newlines).
  hard_wrap: # Interprets line breaks literally (default: true)
  # Enables a set of GFM specific quirks (default: paragraph_end)
  # option: 
  #  - paragraph_end: Disables the kramdown restriction that at least one blank line has to be used after a paragraph before a new block element can be started. 
  #                   Note that if this quirk is used, lazy line wrapping does not fully work anymore!
  #  - no_auto_typographic: Disables automatic conversion of some characters into their corresponding typographic symbols (like -- to em-dash etc). This helps to achieve results closer to what GitHub Flavored Markdown produces.
  gfm_quirks: [paragraph_end] # (default: `paragraph_end`)
  # Enables rendering emoji amidst GFM (default: false)
  gfm_emojis: 
  # Configuration for rendering emoji amidst GFM (default: {})
  gfm_emoji_opts: 
    # The remote location of emoji assets that will be prefixed to emoji file path. Gemoji 3 has the file path set to unicode/[emoji-filename].
    # the absolute path to an emoji file would be: https://github.githubassets.com/images/icons/emoji/unicode/[emoji-filename]
    asset_path: # Defaults to https://github.githubassets.com/images/icons/emoji.
```

The following shows the the differences of settings one by one.


#### hard_wrap

for a markdown file (not converted yet)

> In the first paragraph there are two spaces ' ' after the first 'blank'.

<!-- ========================================================= -->
{%- capture _titles -%}
raw
<!-- split title -->
hard_wrap: false (default)
<!-- split title -->
hard_wrap: true
{%- endcapture -%}
{%- capture _contents -%}
```markdown
blank  
blank

blank
blank

blank\
blank

blank\blank
```
<!-- split content -->
```html
<p>blank<br />
blank</p>

<p>blank
blank</p>

<p>blank<br />
blank</p>

<p>blank\blank</p>
```
<!-- split content -->
```html
<p>blank  <br />
blank</p>

<p>blank<br />
blank</p>

<p>blank\<br />
blank</p>

<p>blank\blank</p>
```
{%- endcapture -%}
{%- assign _contents = _contents | markdownify -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ========================================================= -->

#### paragraph_end

<!-- ========================================================= -->
{%- capture _titles -%}
raw
<!-- split title -->
"gfm_quirks:" or "gfm_quirks: [paragraph_end]"
<!-- split title -->
"gfm_quirks: []" ( disable paragraph_end )
{%- endcapture -%}
<!-- ====================== -->
{%- capture _contents -%}
``````markdown
A
  - b

This is a list
- or is it

blockquote
> text

header
# text

codeblock fenced
```
puts hello world
```

* level 1
  some text

  begin level 2
  * level 2
  * level 2

# h1
## h2
### h3
``````
<!-- split content -->
``````html
<p>A</p>
<ul>
  <li>b</li>
</ul>

<p>This is a list</p>
<ul>
  <li>or is it</li>
</ul>

<p>blockquote</p>
<blockquote>
  <p>text</p>
</blockquote>

<p>header</p>
<h1 id="text">text</h1>

<p>codeblock fenced</p>
<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>puts hello world
</code></pre></div></div>

<ul>
  <li>
    <p>level 1
some text</p>

    <p>begin level 2</p>
    <ul>
      <li>level 2</li>
      <li>level 2</li>
    </ul>
  </li>
</ul>

<h1 id="h1">h1</h1>
<h2 id="h2">h2</h2>
<h3 id="h3">h3</h3>
``````
<!-- split content -->
``````html
<p>A
  - b</p>

<p>This is a list
- or is it</p>

<p>blockquote
&gt; text</p>

<p>header
# text</p>

<p>codeblock fenced
<code class="language-plaintext highlighter-rouge">
puts hello world
</code></p>

<ul>
  <li>
    <p>level 1
some text</p>

    <p>begin level 2
* level 2
* level 2</p>
  </li>
</ul>

<h1 id="h1">h1</h1>
<p>## h2
### h3</p>
``````
{%- endcapture -%}
{%- assign _contents = _contents | markdownify -%}
<!-- ====================== -->
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ========================================================= -->

#### no_auto_typographic

<!-- ========================================================= -->
{%- capture _titles -%}
raw
<!-- split title -->
"gfm_quirks:" (default) (disable no_auto_typographic)
<!-- split title -->
"gfm_quirks: [no_auto_typographic]"
{%- endcapture -%}
<!-- =========================== -->
{%- capture _contents -%}
```markdown
### Header with --ndash 😀

### with --- << typographic >> ... symbols

### bb<font color='red'>haha</font>qq
```
<!-- split content -->
```html
<h3 id="header-with---ndash-">Header with --ndash 😀</h3>

<h3 id="with--typographic--symbols">with — « typographic » … symbols</h3>

<h3 id="bbhahaqq">bb<font color="red">haha</font>qq</h3>
```
<!-- split content -->
```html
<h3 id="header-with-ndash-">Header with –ndash 😀</h3>

<h3 id="with------typographic---symbols">with --- &lt;&lt; typographic &gt;&gt; ... symbols</h3>

<h3 id="bbhahaqq">bb<font color="red">haha</font>qq</h3>
```
{%- endcapture -%}
{%- assign _contents = _contents | markdownify -%}
<!-- =========================== -->
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ========================================================= -->

### auto_ids {#static_id_auto_ids}

<!-- ========================================================= -->
{%- capture _titles -%}
raw
<!-- split title -->
"auto_ids: true" (default)<br>
"transliterated_header_ids: false" (default)
<!-- split title -->
"auto_ids: true" (default)<br>
"auto_id_prefix: hallo-"
{%- endcapture -%}
<!-- ========================= -->
{%- capture _contents -%}
```markdown
### test {#myid}

### variable_name

### abc def öúß

### 192 abc 192

### ;.;;

### variable_name

### variable_name

### ;;

### before 	after tab

### with `code`

### with &nbsp;&auml;&nbsp;space

### With "smart" quotes

### with --- << typographic >> ... symbols

### with $$m=5$$
```
<!-- split content -->
```html
<h3 id="myid">test</h3>

<h3 id="variable_name">variable_name</h3>

<h3 id="abc-def-öúß">abc def öúß</h3>

<h3 id="192-abc-192">192 abc 192</h3>

<h3>;.;;</h3>

<h3 id="variable_name-1">variable_name</h3>

<h3 id="variable_name-2">variable_name</h3>

<h3 id="-1">;;</h3>

<h3 id="before--after-tab">before 	after tab</h3>

<h3 id="with-code">with <code class="language-plaintext highlighter-rouge">code</code></h3>

<h3 id="with-äspace">with  ä space</h3>

<h3 id="with-smart-quotes">With “smart” quotes</h3>

<h3 id="with--typographic--symbols">with — « typographic » … symbols</h3>

<h3 id="with-m5">with \(m=5\)</h3>
```
<!-- split content -->
```html
<h3 id="myid">test</h3>

<h3 id="hallo-variable_name">variable_name</h3>

<h3 id="hallo-abc-def-öúß">abc def öúß</h3>

<h3 id="hallo-192-abc-192">192 abc 192</h3>

<h3 id="hallo-">;.;;</h3>

<h3 id="hallo-variable_name-1">variable_name</h3>

<h3 id="hallo-variable_name-2">variable_name</h3>

<h3 id="hallo--1">;;</h3>

<h3 id="hallo-before--after-tab">before 	after tab</h3>

<h3 id="hallo-with-code">with <code class="language-plaintext highlighter-rouge">code</code></h3>

<h3 id="hallo-with-äspace">with  ä space</h3>

<h3 id="hallo-with-smart-quotes">With “smart” quotes</h3>

<h3 id="hallo-with--typographic--symbols">with — « typographic » … symbols</h3>

<h3 id="hallo-with-m5">with \(m=5\)</h3>
```
{%- endcapture -%}
{%- assign _contents = _contents | markdownify -%}
<!-- ============================= -->
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ========================================================= -->

## Redcarpet

```yml
markdown: redcarpet
redcarpet:
    extensions: [ "fenced_code_blocks", "hard_wrap","autolink", "tables", "strikethrough", "superscript", "with_toc_data", "highlight", "prettify","no_intra_emphasis"]
```

## Customize

Jekyll provides the way to customize Markdown Processor.

> + Custom Markdown Processors - <https://jekyllrb.com/docs/configuration/markdown/#custom-markdown-processors>
