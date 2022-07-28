---
layout: article
title: Code
permalink: /docs/en/components/code
---

See [article of this site]({%  link _jekyll/markdown-highlight.md %}) or [article of official site](https://jekyllrb.com/docs/liquid/tags/#code-snippet-highlighting) for more details about code highlight.

Here are some highlights of code.

{% assign _code_line = "code code code code" %}

<figure class="highlight">
<pre><code><span class="pre">{{ _code_line }} /* pre */ </span>
<span class="hll">{{ _code_line }} /* hll */ </span>
<span class="c"  >{{ _code_line }} /* Comment */  </span>
<span class="err">{{ _code_line }} /* Error */  </span>
<span class="k"  >{{ _code_line }} /* Keyword */  </span>
<span class="l"  >{{ _code_line }} /* Literal */  </span>
<span class="n"  >{{ _code_line }} /* Name */  </span>
<span class="o"  >{{ _code_line }} /* Operator */  </span>
<span class="p"  >{{ _code_line }} /* Punctuation */  </span>
<span class="cm" >{{ _code_line }} /* Comment.Multiline */  </span>
<span class="cp" >{{ _code_line }} /* Comment.Preproc */  </span>
<span class="c1" >{{ _code_line }} /* Comment.Single */  </span>
<span class="cs" >{{ _code_line }} /* Comment.Special */  </span>
<span class="ge" >{{ _code_line }} /* Generic.Emph */  </span>
<span class="gs" >{{ _code_line }} /* Generic.Strong */  </span>
<span class="kc" >{{ _code_line }} /* Keyword.Constant */  </span>
<span class="kd" >{{ _code_line }} /* Keyword.Declaration */  </span>
<span class="kn" >{{ _code_line }} /* Keyword.Namespace */  </span>
<span class="kp" >{{ _code_line }} /* Keyword.Pseudo */  </span>
<span class="kr" >{{ _code_line }} /* Keyword.Reserved */  </span>
<span class="kt" >{{ _code_line }} /* Keyword.Type */  </span>
<span class="ld" >{{ _code_line }} /* Literal.Date */  </span>
<span class="m"  >{{ _code_line }} /* Literal.Number */  </span>
<span class="s"  >{{ _code_line }} /* Literal.String */  </span>
<span class="na" >{{ _code_line }} /* Name.Attribute */  </span>
<span class="nb" >{{ _code_line }} /* Name.Builtin */  </span>
<span class="nc" >{{ _code_line }} /* Name.Class */  </span>
<span class="no" >{{ _code_line }} /* Name.Constant */  </span>
<span class="nd" >{{ _code_line }} /* Name.Decorator */  </span>
<span class="ni" >{{ _code_line }} /* Name.Entity */  </span>
<span class="ne" >{{ _code_line }} /* Name.Exception */  </span>
<span class="nf" >{{ _code_line }} /* Name.Function */  </span>
<span class="nl" >{{ _code_line }} /* Name.Label */  </span>
<span class="nn" >{{ _code_line }} /* Name.Namespace */  </span>
<span class="nx" >{{ _code_line }} /* Name.Other */  </span>
<span class="py" >{{ _code_line }} /* Name.Property */  </span>
<span class="nt" >{{ _code_line }} /* Name.Tag */  </span>
<span class="nv" >{{ _code_line }} /* Name.Variable */  </span>
<span class="ow" >{{ _code_line }} /* Operator.Word */  </span>
<span class="w"  >{{ _code_line }} /* Text.Whitespace */  </span>
<span class="mf" >{{ _code_line }} /* Literal.Number.Float */  </span>
<span class="mh" >{{ _code_line }} /* Literal.Number.Hex */  </span>
<span class="mi" >{{ _code_line }} /* Literal.Number.Integer */  </span>
<span class="mo" >{{ _code_line }} /* Literal.Number.Oct */  </span>
<span class="sb" >{{ _code_line }} /* Literal.String.Backtick */  </span>
<span class="sc" >{{ _code_line }} /* Literal.String.Char */  </span>
<span class="sd" >{{ _code_line }} /* Literal.String.Doc */  </span>
<span class="s2" >{{ _code_line }} /* Literal.String.Double */  </span>
<span class="se" >{{ _code_line }} /* Literal.String.Escape */  </span>
<span class="sh" >{{ _code_line }} /* Literal.String.Heredoc */  </span>
<span class="si" >{{ _code_line }} /* Literal.String.Interpol */  </span>
<span class="sx" >{{ _code_line }} /* Literal.String.Other */  </span>
<span class="sr" >{{ _code_line }} /* Literal.String.Regex */  </span>
<span class="s1" >{{ _code_line }} /* Literal.String.Single */  </span>
<span class="ss" >{{ _code_line }} /* Literal.String.Symbol */  </span>
<span class="bp" >{{ _code_line }} /* Name.Builtin.Pseudo */  </span>
<span class="vc" >{{ _code_line }} /* Name.Variable.Class */  </span>
<span class="vg" >{{ _code_line }} /* Name.Variable.Global */  </span>
<span class="vi" >{{ _code_line }} /* Name.Variable.Instance */  </span>
<span class="il" >{{ _code_line }} /* Literal.Number.Integer.Long */  </span>
<span class="gh" >{{ _code_line }} /* Generic Heading & Diff Header */  </span>
<span class="gu" >{{ _code_line }} /* Generic.Subheading & Diff Unified/Comment? */  </span>
<span class="gd" >{{ _code_line }} /* Generic.Deleted & Diff Deleted */  </span>
<span class="gi" >{{ _code_line }} /* Generic.Inserted & Diff Inserted */  </span>
</code></pre>
</figure>

## Javascript

<!-- ====================================================================================== -->
{%- capture _code -%}
(function() {
  // test code
  var SOURCES = window.TEXT_VARIABLES.sources;
  window.Lazyload.js(SOURCES.jquery, function() {
    $(function() {
      var $this ,$scroll;
      var $articleContent = $('.js-article-content');
      var hasSidebar = $('.js-page-root').hasClass('layout--page--sidebar');
      var scroll = hasSidebar ? '.js-page-main' : 'html, body';
      $scroll = $(scroll);
      $articleContent.find('.highlight').each(function() {
        $this = $(this);
        $this.attr('data-lang', $this.find('code').attr('data-lang'));
      });
      $articleContent.find('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]').each(function() {
        $this = $(this);
        $this.append($('<a class="anchor d-print-none" aria-hidden="true"></a>').html('<i class="fas fa-anchor"></i>'));
      });
      $articleContent.on('click', '.anchor', function() {
        $scroll.scrollToAnchor('#' + $(this).parent().attr('id'), 400);
      });
    });
  });
})();
{%- endcapture -%}
{%- capture _code_rouge -%}
  {%- highlight javascript -%}
  {{_code}}
  {%- endhighlight -%}
{%- endcapture -%}
{%- capture _code_kramdown -%}
```javascript
{{ _code }}
```
{%- endcapture -%}
<!-- ====================================================================================== -->
{%- capture _titles -%}
rouge raw
<!-- split title -->
rouge render
<!-- split title -->
rouge html
{%- endcapture -%}
{%- capture _contents -%}
{%- highlight javascript -%}
{% raw %}{%- highlight javascript -%}{% endraw %}
{{ _code }}
{% raw %}{%- endhighlight -%}{% endraw %}
{%- endhighlight -%}
<!-- split content -->
{{ _code_rouge }}
<!-- split content -->
{%- highlight html -%}
{{ _code_rouge }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ====================================================================================== -->
{%- capture _titles -%}
kramdown raw
<!-- split title -->
kramdown render
<!-- split title -->
kramdown html
{%- endcapture -%}
{%- capture _contents -%}
{%- highlight markdown -%}
```javascript
{{ _code }}
```
{%- endhighlight -%}
<!-- split content -->
{{ _code_kramdown | markdownify }}
<!-- split content -->
{%- highlight html -%}
{{ _code_kramdown | markdownify }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ====================================================================================== -->

## Html

<!-- ====================================================================================== -->
{%- capture _code -%}
<!-- testcode -->
<div class="layout--page layout--page--sidebar clearfix js-page-root">
  <div class="page__mask d-print-none js-page-mask js-sidebar-hide"></div>
  <div class="page__viewport">
    <div class="page__actions d-print-none">
      <div class="button button--circle button--lg box-shadow-2 sidebar-button js-sidebar-show js-sidebar-show-1 js-sidebar-show-2 js-sidebar-show-3">
        <i class="fas fa-bars icon--show"></i>
      </div>
    </div>
  </div>
</div>
{%- endcapture -%}
{%- capture _code_rouge -%}
  {%- highlight html -%}
  {{_code}}
  {%- endhighlight -%}
{%- endcapture -%}
{%- capture _code_kramdown -%}
```html
{{ _code }}
```
{%- endcapture -%}
<!-- ====================================================================================== -->
{%- capture _titles -%}
rouge raw
<!-- split title -->
rouge render
<!-- split title -->
rouge html
{%- endcapture -%}
{%- capture _contents -%}
{%- highlight html -%}
{% raw %}{%- highlight html -%}{% endraw %}
{{ _code }}
{% raw %}{%- endhighlight -%}{% endraw %}
{%- endhighlight -%}
<!-- split content -->
{{ _code_rouge }}
<!-- split content -->
{%- highlight html -%}
{{ _code_rouge }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ====================================================================================== -->
{%- capture _titles -%}
kramdown raw
<!-- split title -->
kramdown render
<!-- split title -->
kramdown html
{%- endcapture -%}
{%- capture _contents -%}
{%- highlight html -%}
```html
{{ _code }}
```
{%- endhighlight -%}
<!-- split content -->
{{ _code_kramdown | markdownify }}
<!-- split content -->
{%- highlight html -%}
{{ _code_kramdown | markdownify }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ====================================================================================== -->

## Ruby

```ruby
Jekyll::Hooks.register(:site, :pre_render) do |site|
  # insert posts last modify 
  Jekyll.logger.debug "Hook: insert posts last modify"
  site.collection_names.each do | collection_name |
    _collection = site.collections[collection_name]
    _collection.docs.each do | post |
      # puts post.url
      commit_num = `git rev-list --count HEAD "#{ post.path }"`
      if commit_num.to_i > 0
        # lastmod_date = `git log -1 --pretty="%ad" --date=iso "#{ post.path }"`
        commit_dates = `git log --pretty="%ad" --date=iso "#{ post.path }"`.lines()
        lastmod_date = commit_dates[0]
        publish_date = commit_dates[-1]
        post.data['last_modified_at'] = lastmod_date
        post.data['first_publish_at'] = publish_date
      end
    end
  end
end
```

## Java

```java
import java.util.*;
 
class Palindrome
{
   public static void main(String args[])
   {
      String original, reverse = "";
      Scanner in = new Scanner(System.in);
 
      System.out.println("Enter a string to check if it is a palindrome");
      original = in.nextLine();
 
      int length = original.length();
 
      for ( int i = length - 1; i >= 0; i-- )
         reverse = reverse + original.charAt(i);
 
      if (original.equals(reverse))
         System.out.println("Entered string is a palindrome.");
      else
         System.out.println("Entered string is not a palindrome.");
 
   }
}
```
