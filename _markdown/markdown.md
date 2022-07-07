---
layout: article
title: Markdown
permalink: /markdown
tags: ['guide', 'typography']
author: foo
---

## Syntax

The markdown syntax and style of this site can be referred [here]({% link _docs/en/1.3 typography.md %}).\
(see [here](https://kramdown.gettalong.org/quickref.html) for origianl syntax and typography of kramdown)

In addition, since Jekyll use kramdown as the markdown processor by default. You can use the [syntax](https://kramdown.gettalong.org/syntax.html) of kramdown, such as [IAL(Inline Attribute Lists)](https://kramdown.gettalong.org/syntax.html#block-ials)

{% capture _markdown %}
{::comment}
This text is completely ignored by kramdown - a comment in the text.
{:/comment}

Do you see {::comment}this text{:/comment}?
{::comment}some other comment{:/}
{::}some other{:.special}

{::options key="val" /}

A simple{:.underline} paragraph with an ID{:#id}{:.class}. attribute.
{: #para-one}

> A blockquote{:rel='something'} with a title{:.tools}
{:title="The blockquote title"}
{: #myid}

{:.ruby}
    Some code here
{% endcapture %}
{%- capture _titles -%}
before render
<!-- split title -->
after render
{%- endcapture -%}
{%- capture _contents -%}
{%- highlight markdown -%}
{{ _markdown }}
{%- endhighlight -%}
<!-- split content -->
{%- highlight html -%}
{{ _markdown | markdownify }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}

## Markdown Processor

In the official document of Jekyll, we have some [options](https://jekyllrb.com/docs/configuration/markdown/) for setting.

### Kramdown

We further knows that [Kramdown](https://kramdown.gettalong.org/index.html) is the default Markdown renderer for Jekyll. 

```yml
markdown: kramdown # options: kramdown (default), redcarpet
```

see [here]({% link _markdown/kramdown/kramdown.md %}) for more.

### redcarpet

```yml
markdown: redcarpet
redcarpet:
    extensions: [ "fenced_code_blocks", "hard_wrap","autolink", "tables", "strikethrough", "superscript", "with_toc_data", "highlight", "prettify","no_intra_emphasis"]
```

### Customize

Jekyll provides the way to customize Markdown Processor.

> + Custom Markdown Processors - <https://jekyllrb.com/docs/configuration/markdown/#custom-markdown-processors>

## Highlight

[Rouge](https://github.com/jneen/rouge) is Jekyll's default syntax highlighter.

See [here]({% link _markdown/highlight/rouge.md %}) for more.

Similar to Rouge are [Coderay]({% link _markdown/highlight/coderay.md %}) (few languages support) and [Pygments]({% link _markdown/highlight/pygments.md %}) (Jekyll is no longer supported).
