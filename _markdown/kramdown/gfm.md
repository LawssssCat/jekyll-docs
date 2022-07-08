---
layout: article
permalink: /markdown/kramdown/gfm
date: 2022-06-20
title: GFM (GitHub Flavored Markdown)
---

[jekyll-github]: https://github.com/jekyll/jekyll
[kramdown-github]: https://github.com/gettalong/kramdown
[parser-gfm]: https://github.com/kramdown/parser-gfm
[parser-gfm.gfm.rb]: https://github.com/kramdown/parser-gfm/blob/master/lib/kramdown/parser/gfm.rb

By default, kramdown uses the GitHub Flavored Markdown ([GFM](https://github.com/kramdown/parser-gfm)) dialect to converts Markdown documents to HTML.

<!-- ========================================================= -->
{%- capture _summary -%}
  source code <a href='https://github.com/jekyll/jekyll/blob/master/lib/jekyll/converters/markdown/kramdown_parser.rb'>kramdown_parser.rb</a>
{%- endcapture -%}
{%- capture _code -%}
{%- highlight ruby -%}
def load_dependencies
  require "kramdown-parser-gfm" if @config["input"] == "GFM"
  ...
end
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-details.html summary=_summary code=_code -%}
<!-- ========================================================= -->

> You can also change the processor used by Kramdown (as specified for the input key in the Kramdown [RDoc](https://kramdown.gettalong.org/rdoc/Kramdown/Document.html#method-c-new))

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

## settings

### hard_wrap

<!-- ========================================================= -->
{%- capture _summary -%}
  source code <a href='https://github.com/kramdown/parser-gfm/blob/master/lib/kramdown/parser/gfm.rb'>lib/kramdown/parser/gfm.rb</a>
{%- endcapture -%}
{%- capture _code -%}
{%- highlight ruby -%}
def initialize(source, options)
  ...
  @span_parsers.delete(:line_break)       if @options[:hard_wrap]
  ...
  @hard_line_break = "#{@options[:hard_wrap] ? '' : '\\'}\n"
  ...
end
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-details.html summary=_summary code=_code -%}
<!-- ========================================================= -->

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
{%- highlight markdown -%}
blank  
blank

blank
blank

blank\
blank

blank\blank
{%- endhighlight -%}
<!-- split content -->
{%- highlight html -%}
<p>blank<br />
blank</p>

<p>blank
blank</p>

<p>blank<br />
blank</p>

<p>blank\blank</p>
{%- endhighlight -%}
<!-- split content -->
{%- highlight html -%}
<p>blank  <br />
blank</p>

<p>blank<br />
blank</p>

<p>blank\<br />
blank</p>

<p>blank\blank</p>
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ========================================================= -->

### gfm_quirks

<!-- ========================================================= -->
{%- capture _summary -%}
  source code <a href='https://github.com/kramdown/parser-gfm/blob/master/lib/kramdown/parser/gfm.rb'>lib/kramdown/parser/gfm.rb</a>
{%- endcapture -%}
{%- capture _code -%}
{%- highlight ruby -%}
def initialize(source, options)
  super
  @options[:auto_id_stripping] = true
  @id_counter = Hash.new(-1)

  @span_parsers.delete(:line_break)       if @options[:hard_wrap]
  @span_parsers.delete(:typographic_syms) if @options[:gfm_quirks].include?(:no_auto_typographic)

  if @options[:gfm_quirks].include?(:paragraph_end)
    atx_header_parser = :atx_header_gfm_quirk
    @paragraph_end    = self.class::PARAGRAPH_END_GFM
  else
    atx_header_parser = :atx_header_gfm
    @paragraph_end    = self.class::PARAGRAPH_END
  end

  ...

end
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-details.html summary=_summary code=_code -%}
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
{%- capture _contents -%}
{%- highlight markdown -%}
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
{%- endhighlight -%}
<!-- split content -->
{%- highlight html -%}
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
{%- endhighlight -%}
<!-- split content -->
{%- highlight html -%}
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
{%- endhighlight -%}
{%- endcapture -%}
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
{%- capture _contents -%}
{%- highlight markdown -%}
### Header with --ndash 😀

### with --- << typographic >> ... symbols

### bb<font color='red'>haha</font>qq
{%- endhighlight -%}
<!-- split content -->
{%- highlight html -%}
<h3 id="header-with---ndash-">Header with --ndash 😀</h3>

<h3 id="with--typographic--symbols">with — « typographic » … symbols</h3>

<h3 id="bbhahaqq">bb<font color="red">haha</font>qq</h3>
{%- endhighlight -%}
<!-- split content -->
{%- highlight html -%}
<h3 id="header-with-ndash-">Header with –ndash 😀</h3>

<h3 id="with------typographic---symbols">with --- &lt;&lt; typographic &gt;&gt; ... symbols</h3>

<h3 id="bbhahaqq">bb<font color="red">haha</font>qq</h3>
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ========================================================= -->

### auto_ids {#static_id_auto_ids}

<!-- ========================================================= -->
{%- capture _summary -%}
source code <a href='https://github.com/kramdown/parser-gfm/blob/master/lib/kramdown/parser/gfm.rb'>lib/kramdown/parser/gfm.rb</a>
{%- endcapture -%}
{%- capture _code -%}
{%- highlight ruby -%}
def update_elements(element)
  element.children.map! do |child|
    if child.type == :text && child.value.include?(@hard_line_break)
      update_text_type(element, child)
    elsif child.type == :html_element
      child
    elsif child.type == :header && @options[:auto_ids] && @options[:transliterated_header_ids]
      # Let the kramdown converter create the ID
      child
    elsif child.type == :header && @options[:auto_ids] && !child.attr.key?('id')
      child.attr['id'] = generate_gfm_header_id(child.options[:raw_text])
      child
    else
      update_elements(child)
      child
    end
  end.flatten!
end
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-details.html summary=_summary code=_code -%}
<!-- ========================================================= -->

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
{%- capture _contents -%}
{%- highlight markdown -%}
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
{%- endhighlight -%}
<!-- split content -->
{%- highlight html -%}
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
{%- endhighlight -%}
<!-- split content -->
{%- highlight html -%}
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
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ========================================================= -->
