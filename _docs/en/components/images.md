---
layout: article
title: Images
permalink: /docs/en/components/images
---

| Type | Class Names |
| ---- | ---- |
| **base**  | image |
| **size**  | image\-\-md (default), image\-\-xs, image\-\-sm, image\-\-lg, image\-\-xl |
| **clickable**  | image\-\-clickable |

<!-- ============== -->
{%- capture _img_src -%}
{% link assets/images/cover1_with_title.svg %}
{%- endcapture -%}
<!-- ============== -->

## Base

<!-- ============== -->
{%- capture _code -%}
![Image]({{ _img_src }} "Image_Example"){:.image}
{%- endcapture -%}
{{ _code }}
```html
{{ _code | markdownify | replace: '<p>', '' | replace: '</p>', '' | strip }}
```
or
```markdown
{{ _code }}
```
<!-- ============== -->

## Border

<div class="grid grid--p-2">
<div class="cell cell--12 cell--md-4" markdown="1">
{%- capture _code -%}
![Image]({{ _img_src }} "Image_border"){:.image.image--border}
{%- endcapture -%}
{{ _code }}
</div>
<div class="cell cell--12 cell--md-auto" markdown="1">
```html
{{ _code | markdownify | replace: '<p>', '' | replace: '</p>', '' | strip }}
```
or
```markdown
{{ _code }}
```
</div>
</div>

## Size

### Extreme Small

<!-- ============== -->
{%- capture _code -%}
<img class="image image--xs image--border" src="{{ _img_src }}"/>
{%- endcapture -%}
{{ _code }}
```html
{{ _code }}
```
<!-- ============== -->

### Small

<!-- ============== -->
{%- capture _code -%}
<img class="image image--sm image--border" src="{{ _img_src }}"/>
{%- endcapture -%}
{{ _code }}
```html
{{ _code }}
```
<!-- ============== -->

### Middle

<!-- ============== -->
{%- capture _code -%}
<img class="image image--md image--border" src="{{ _img_src }}"/>
{%- endcapture -%}
{{ _code }}
```html
{{ _code }}
```
<!-- ============== -->

### Large

<!-- ============== -->
{%- capture _code -%}
<img class="image image--lg image--border" src="{{ _img_src }}"/>
{%- endcapture -%}
{{ _code }}
```html
{{ _code }}
```
<!-- ============== -->

### Extreme Large

<!-- ============== -->
{%- capture _code -%}
<img class="image image--xl image--border" src="{{ _img_src }}"/>
{%- endcapture -%}
{{ _code }}
```html
{{ _code }}
```
<!-- ============== -->

## Clickable

<!-- ============== -->
{%- capture _code -%}
<img class="image image--clickable" src="{{ _img_src }}" style="{{ _img_style }}"/>
{%- endcapture -%}
{{ _code }}
```html
{{ _code }}
```
<!-- ============== -->
