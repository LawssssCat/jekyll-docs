---
layout: article
title: Images
permalink: /docs/en/components/images
---

| Type | Class Names |
| ---- | ---- |
| **base**  | image |
| **border**  | image\-\-border |
| **shadow**  | image\-\-shadow |
| **clickable**  | image\-\-clickable |
| **Shape**  | image\-\-rounded, image\-\-circle |
| **size**  | image\-\-md (default), image\-\-xs, image\-\-sm, image\-\-lg, image\-\-xl, image\-\-auto |

<!-- ============== -->
{%- capture _img_src -%}
{% link assets/images/cover1_with_title.svg %}
{%- endcapture -%}
<!-- ============== -->
{%- assign _grid_p = "grid--p-1" -%}
<!-- ============== -->

## Base

<div class="grid {{ _grid_p }}">
<div class="cell cell--sm-12 cell--4" markdown="1">
{%- capture _code -%}
![Image]({{ _img_src }} "Image_Example"){:.image}
{%- endcapture -%}
{{ _code }}
</div>
<div class="cell cell--sm-12 cell--auto" markdown="1">
```html
{{ _code | markdownify | replace: '<p>', '' | replace: '</p>', '' | strip }}
```
or
```markdown
{{ _code }}
```
</div>
</div>

## Border

<div class="grid {{ _grid_p }}">
<div class="cell cell--sm-12 cell--4" markdown="1">
{%- capture _code -%}
![Image]({{ _img_src }} "Image_border"){:.image.image--border}
{%- endcapture -%}
{{ _code }}
</div>
<div class="cell cell--sm-12 cell--auto" markdown="1">
```html
{{ _code | markdownify | replace: '<p>', '' | replace: '</p>', '' | strip }}
```
or
```markdown
{{ _code }}
```
</div>
</div>

### Shadow

<div class="grid {{ _grid_p }}">
<div class="cell cell--sm-12 cell--4" markdown="1">
{%- capture _code -%}
<img class="image image--shadow" src="{{ _img_src }}"/>
{%- endcapture -%}
{{ _code }}
</div>
<div class="cell cell--sm-12 cell--auto" markdown="1">
```html
{{ _code }}
```
</div>
</div>

## Clickable

<div class="grid {{ _grid_p }}">
<div class="cell cell--sm-12 cell--4" markdown="1">
{%- capture _code -%}
<img class="image image--clickable" src="{{ _img_src }}"/>
{%- endcapture -%}
{{ _code }}
</div>
<div class="cell cell--sm-12 cell--auto" markdown="1">
```html
{{ _code }}
```
</div>
</div>

<!-- ================ -->

<div class="grid {{ _grid_p }}">
<div class="cell cell--sm-12 cell--4" markdown="1">
{%- capture _code -%}
<img class="image image--border image--clickable" src="{{ _img_src }}"/>
{%- endcapture -%}
{{ _code }}
</div>
<div class="cell cell--sm-12 cell--auto" markdown="1">
```html
{{ _code }}
```
</div>
</div>

<!-- ================ -->

<div class="grid {{ _grid_p }}">
<div class="cell cell--sm-12 cell--4" markdown="1">
{%- capture _code -%}
<img class="image image--shadow image--clickable" src="{{ _img_src }}"/>
{%- endcapture -%}
{{ _code }}
</div>
<div class="cell cell--sm-12 cell--auto" markdown="1">
```html
{{ _code }}
```
</div>
</div>

## Shape

### Rounded

<div class="grid {{ _grid_p }}">
<div class="cell cell--sm-12 cell--4" markdown="1">
{%- capture _code -%}
<img class="image image--border image--rounded image--clickable" src="{{ _img_src }}"/>
{%- endcapture -%}
{{ _code }}
</div>
<div class="cell cell--sm-12 cell--auto" markdown="1">
```html
{{ _code }}
```
</div>
</div>

### Circle

<div class="grid {{ _grid_p }}">
<div class="cell cell--sm-12 cell--4" markdown="1">
{%- capture _code -%}
<img class="image image--border image--circle image--clickable" src="{{ _img_src }}"/>
{%- endcapture -%}
{{ _code }}
</div>
<div class="cell cell--sm-12 cell--auto" markdown="1">
```html
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

### Auto

<!-- ============== -->
{%- capture _code -%}
<img class="image image--auto image--border" src="{{ _img_src }}"/>
{%- endcapture -%}
{{ _code }}
```html
{{ _code }}
```
<!-- ============== -->
