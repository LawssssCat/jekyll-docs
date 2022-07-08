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

<img class="image image--xs" src="{{ _img_src }}"/>

```html
<img class="image image--xs" src=""/>
```

### Small

<img class="image image--sm" src="{{ _img_src }}"/>

```html
<img class="image image--sm" src=""/>
```

### Middle

<img class="image image--md" src="{{ _img_src }}"/>

```html
<img class="image image--md" src=""/>
```

### Large

<img class="image image--lg" src="{{ _img_src }}"/>

```html
<img class="image image--lg" src=""/>
```

### Extreme Large

<img class="image image--xl" src="{{ _img_src }}"/>

```html
<img class="image image--xl" src=""/>
```
