---
layout: page
---

Jekyll - markdown options
https://jekyllrb.com/docs/configuration/markdown/

Kramdown - the default Markdown renderer for Jekyll
https://kramdown.gettalong.org/index.html
https://kramdown.gettalong.org/syntax.html

redcarpet
```yml
markdown: redcarpet
redcarpet:
    extensions: [ "fenced_code_blocks", "hard_wrap","autolink", "tables", "strikethrough", "superscript", "with_toc_data", "highlight", "prettify","no_intra_emphasis"]
```