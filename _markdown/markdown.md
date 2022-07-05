---
layout: article
title: Markdown in Jekyll 
permalink: /markdown
---

In the official document of Jekyll, we have some [options](https://jekyllrb.com/docs/configuration/markdown/) for setting.

We further knows that [Kramdown](https://kramdown.gettalong.org/index.html) is the default Markdown renderer for Jekyll. 

>+ Kramdown syntax - <https://kramdown.gettalong.org/syntax.html>

redcarpet
```yml
markdown: redcarpet
redcarpet:
    extensions: [ "fenced_code_blocks", "hard_wrap","autolink", "tables", "strikethrough", "superscript", "with_toc_data", "highlight", "prettify","no_intra_emphasis"]
```
