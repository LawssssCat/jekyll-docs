---
layout: article
title: Spacing
permalink: /docs/en/components/spacing
---

Spacing classes are named using the format `{property}{side}-{spacer}`.

Where *property* is one of:

- `m` - for classes that set `margin`
- `p` - for classes that set `padding`

Where *side* is one of:

- `t` - for classes that set `margin-top` or `padding-top`
- `b` - for classes that set `margin-bottom` or `padding-bottom`
- `l` - for classes that set `margin-left` or `padding-left`
- `r` - for classes that set `margin-right` or `padding-right`
- `x` - for classes that set both `*-left` and `*-right`
- `y` - for classes that set both `*-top` and `*-bottom`

blank - for classes that set a `margin` or `padding` on all 4 sides of the element

Where *spacer* is one of:

- 0 - for classes that eliminate the `margin` or `padding` by setting it to `0`
- 1 - for classes that set the `margin` or `padding` to `$spacer * .25`
- 2 - for classes that set the `margin` or `padding` to `$spacer * .5`
- 3 - for classes that set the `margin` or `padding` to `$spacer`
- 4 - for classes that set the `margin` or `padding` to `$spacer * 1.5`
- 5 - for classes that set the `margin` or `padding` to `$spacer * 3`
- auto - for classes that set the `margin` to `auto`

`$spacer` is default to `1rem`, you can change or add new entries to the `$spacers` Sass map variable.

## Examples

<!-- =================================================================== -->
{%- assign _color_margin  = "#fcb78c" -%}
{%- assign _color_padding = "#a4f798" -%}
{%- assign _color_content = "#97caff" -%}

+ margin - `{{ _color_margin }}`{:style="background: {{ _color_margin }}"}
+ padding - `{{ _color_padding }}`{:style="background: {{ _color_padding }}"}
+ content - `{{ _color_content }}`{:style="background: {{ _color_content }}"}
<!-- =================================================================== -->

<!-- =================================================================== -->
{%- capture _code_style -%}
.example-spacing {
  .outter {
    background: {{ _color_margin }};
    overflow: auto;
    > div {
      background: {{ _color_padding }};
      .inner {
        background: {{ _color_content }};
        height: 2rem;
      }
    }
  }
}
{%- endcapture -%}
<!-- =================================================================== -->

### mt (margin-top)

<!-- =================================================================== -->
<style>
{{ _code_style | scssify }}
</style>
{%- capture _code_html -%}
<div class="example-spacing">
  <div class="outter">
    <div class="mt-2"><!-- here -->
      <div class="inner"></div>
    </div>
  </div>
</div>
{%- endcapture -%}
{{ _code_html }}
<!-- =================================================================== -->
{%- capture _titles -%}
html
<!-- split title -->
scss
{%- endcapture -%}
{%- capture _contents -%}
{%- highlight html -%}
{{ _code_html }}
{%- endhighlight -%}
<!-- split content -->
{%- highlight scss -%}
{{ _code_style }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}

### mx (margin-left and margin-right)

<!-- =================================================================== -->
<style>
{{ _code_style | scssify }}
</style>
{%- capture _code_html -%}
<div class="example-spacing">
  <div class="outter">
    <div class="mx-2"><!-- here -->
      <div class="inner"></div>
    </div>
  </div>
</div>
{%- endcapture -%}
{{ _code_html }}
<!-- =================================================================== -->
{%- capture _titles -%}
html
<!-- split title -->
scss
{%- endcapture -%}
{%- capture _contents -%}
{%- highlight html -%}
{{ _code_html }}
{%- endhighlight -%}
<!-- split content -->
{%- highlight scss -%}
{{ _code_style }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}

### p (padding)

<!-- =================================================================== -->
<style>
{{ _code_style | scssify }}
</style>
{%- capture _code_html -%}
<div class="example-spacing">
  <div class="outter">
    <div class="p-4"><!-- here -->
      <div class="inner"></div>
    </div>
  </div>
</div>
{%- endcapture -%}
{{ _code_html }}
<!-- =================================================================== -->
{%- capture _titles -%}
html
<!-- split title -->
scss
{%- endcapture -%}
{%- capture _contents -%}
{%- highlight html -%}
{{ _code_html }}
{%- endhighlight -%}
<!-- split content -->
{%- highlight scss -%}
{{ _code_style }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
