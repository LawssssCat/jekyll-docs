---
layout: article
title: Images
permalink: /docs/en/components/images
---

| Type | Class Names |
| ---- | ---- |
| **base**  | image |
| **size**  | image\-\-md (default), image\-\-xs, image\-\-sm, image\-\-lg, image\-\-xl |

## Size

### Extreme Small

<!-- ============== -->
{%- capture _img_src -%}
{% link assets/images/cover1_with_title.svg %}
{%- endcapture -%}
<!-- ============== -->
<!-- ============== -->
{%- capture _img_style -%}
background: #1fefff;
{%- endcapture -%}
<!-- ============== -->

<!-- ============== -->
{%- capture _code -%}
<img class="image image--xs" src="{{ _img_src }}" style="{{ _img_style }}"/>
{%- endcapture -%}
{{ _code }}
```html
{{ _code }}
```
<!-- ============== -->

### Small

<!-- ============== -->
{%- capture _code -%}
<img class="image image--sm" src="{{ _img_src }}" style="{{ _img_style }}"/>
{%- endcapture -%}
{{ _code }}
```html
{{ _code }}
```
<!-- ============== -->

### Middle

<!-- ============== -->
{%- capture _code -%}
<img class="image image--md" src="{{ _img_src }}" style="{{ _img_style }}"/>
{%- endcapture -%}
{{ _code }}
```html
{{ _code }}
```
<!-- ============== -->

### Large

<!-- ============== -->
{%- capture _code -%}
<img class="image image--lg" src="{{ _img_src }}" style="{{ _img_style }}"/>
{%- endcapture -%}
{{ _code }}
```html
{{ _code }}
```
<!-- ============== -->

### Extreme Large

<!-- ============== -->
{%- capture _code -%}
<img class="image image--xl" src="{{ _img_src }}" style="{{ _img_style }}"/>
{%- endcapture -%}
{{ _code }}
```html
{{ _code }}
```
<!-- ============== -->
