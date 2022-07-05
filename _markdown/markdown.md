---
layout: article
title: Markdown
permalink: /markdown
---

## Markdown Processor

In the official document of Jekyll, we have some [options](https://jekyllrb.com/docs/configuration/markdown/) for setting.

### Kramdown

We further knows that [Kramdown](https://kramdown.gettalong.org/index.html) is the default Markdown renderer for Jekyll. 

```yml
markdown: kramdown # options: kramdown (default), redcarpet
```

> + Kramdown syntax - <https://kramdown.gettalong.org/syntax.html>

### redcarpet

```yml
markdown: redcarpet
redcarpet:
    extensions: [ "fenced_code_blocks", "hard_wrap","autolink", "tables", "strikethrough", "superscript", "with_toc_data", "highlight", "prettify","no_intra_emphasis"]
```

### Customize

Jekyll provides the way to customize Markdown Processor.

> + Custom Markdown Processors - <https://jekyllrb.com/docs/configuration/markdown/#custom-markdown-processors>
