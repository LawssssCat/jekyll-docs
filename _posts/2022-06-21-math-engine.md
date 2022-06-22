---
layout: article
---

kramdown supports the use of various math engines. The default math engine is [MathJax](https://kramdown.gettalong.org/math_engine/mathjax.html) (which can also be used with [KaTeX](https://katex.org/)).

## KaTeX

KaTeX - <https://katex.org/>

The fastest math typesetting library for the web.

## MathJax

MathJax - <https://www.mathjax.org/>

MathJax is a javascript library that uses the TeX algorithms and fonts to display math formulas on HTML pages. It allows for very fine-grained configuration, is widely used and works on all modern browsers.

example - <https://jsbin.com/?html,output>

When \(a \ne 0\), there are two solutions to \(ax^2 + bx + c = 0\) and they are
\[x = {-b \pm \sqrt{b^2-4ac} \over 2a}.\]

### Write LaTeX Equations in Jekyll Using MathJax & Kramdown

In Kramdown, [Math Engine MathJax](https://kramdown.gettalong.org/math_engine/mathjax.html) marks up math formulas with the standard MathJax syntax of `\(...\)` for inline math and `\[...\]` for block math (works for both version 2.x and 3.x of MathJax). The only other thing to do is to include the MathJax library itself on the HTML page.

For proper functionality, the HTML template must be configured to link to the engine’s Javascript and CSS. Note that the CSS includes references to webfonts.

```html
<!-- Mathjax Support -->
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>
```

> Note that kramdown does **not** ship with the MathJax library and that therefore the “default” template does **not** include a link to it! we need to add a link to MathJax to our page.

> Also available are precompiling versions to eliminate the need for client-side Javascript. Those are [Mathjax-Node](https://kramdown.gettalong.org/math_engine/mathjaxnode.html), [KaTeX](https://kramdown.gettalong.org/math_engine/katex.html), and [SsKaTeX](https://kramdown.gettalong.org/math_engine/sskatex.html). Each one requires a Javascript engine installed where kramdown runs, in order to perform the precompilation. The resulting pages still require CSS and fonts, but no Javascript anymore.

#### Math syntax in Kramdown

The default math delimiters are `$$...$$` and `\[...\]` for displayed mathematics, and `\(...\)` for in-line mathematics.

> Note in particular that the `$...$` in-line delimiters are not used by default. Since dollar signs appear too often in non-mathematical settings.

The following kramdown fragment:

```html
$$
\begin{align*}
  & \phi(x,y) = \phi \left(\sum_{i=1}^n x_ie_i, \sum_{j=1}^n y_je_j \right)
  = \sum_{i=1}^n \sum_{j=1}^n x_i y_j \phi(e_i, e_j) = \\
  & (x_1, \ldots, x_n) \left( \begin{array}{ccc}
      \phi(e_1, e_1) & \cdots & \phi(e_1, e_n) \\
      \vdots & \ddots & \vdots \\
      \phi(e_n, e_1) & \cdots & \phi(e_n, e_n)
    \end{array} \right)
  \left( \begin{array}{c}
      y_1 \\
      \vdots \\
      y_n
    \end{array} \right)
\end{align*}
$$
```

will render as

```html
\[\begin{align*} & \phi(x,y) = \phi \left(\sum_{i=1}^n x_ie_i, \sum_{j=1}^n y_je_j \right) = \sum_{i=1}^n \sum_{j=1}^n x_i y_j \phi(e_i, e_j) = \\ & (x_1, \ldots, x_n) \left( \begin{array}{ccc} \phi(e_1, e_1) & \cdots & \phi(e_1, e_n) \\ \vdots & \ddots & \vdots \\ \phi(e_n, e_1) & \cdots & \phi(e_n, e_n) \end{array} \right) \left( \begin{array}{c} y_1 \\ \vdots \\ y_n \end{array} \right) \end{align*}\]
```

> Note that LaTeX code that uses the pipe symbol `|` in inline math statements may lead to a line being recognized as a table line. This problem can be avoided by using the `\vert` command instead of `|`

more
+ Kramdown: [Math Blocks](https://kramdown.gettalong.org/syntax.html#math-blocks) / [Math Support](https://kramdown.gettalong.org/converter/html.html#math-support) [Math Engine MathJax](https://kramdown.gettalong.org/math_engine/mathjax.html)
+ [Displaying Math in RSS feeds](http://www.noamross.net/archives/2012-04-04-math-in-rss-feeds/)
+ [How to use MathJax in Jekyll generated Github pages](http://haixing-hu.github.io/programming/2013/09/20/how-to-use-mathjax-in-jekyll-generated-github-pages/)