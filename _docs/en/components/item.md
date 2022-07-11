---
layout: article
title: Item
permalink: /docs/en/components/item
---

<!-- ============== -->
{%- capture _img_src -%}
{% link assets/images/cover1_with_title.svg %}
{%- endcapture -%}
<!-- ============== -->

## Content

<!-- ========================== -->
{%- capture _code -%}
<div class="item">
  <div class="item__content">
    <div class="item__header">
      <h4>Photograph</h4>
    </div>
    <div class="item__description">
      <p>
        A photograph is an image created by light falling on a photosensitive surface, usually photographic film or an electronic image sensor, such as a CCD or a CMOS chip.
      </p>
    </div>
  </div>
</div>
{%- endcapture -%}
<!-- ========================== -->
{{ _code }}
<!-- ========================== -->
```html
{{ _code }}
```
<!-- ========================== -->

## Image and Content

<!-- ========================== -->
{%- capture _code -%}
<div class="item">
  <div class="item__image">
    <img class="image" src="{{ _img_src }}"/>
  </div>
  <div class="item__content">
    <div class="item__header">
      <h4>Photograph</h4>
    </div>
  </div>
</div>
{%- endcapture -%}
<!-- ========================== -->
{{ _code }}
<!-- ========================== -->
```html
{{ _code }}
```
<!-- ========================== --> 

<!-- ========================== --> 
{%- capture _code -%}
<div class="item">
  <div class="item__image">
    <img class="image" src="{{ _img_src }}"/>
  </div>
  <div class="item__content">
    <div class="item__header">
      <h4>Photograph</h4>
    </div>
    <div class="item__description">
      <p>
        A photograph is an image created by light falling on a photosensitive surface, usually photographic film or an electronic image sensor, such as a CCD or a CMOS chip.
      </p>
    </div>
  </div>
</div>
{%- endcapture -%}
<!-- ========================== -->
{{ _code }}
<!-- ========================== -->
```html
{{ _code }}
```
<!-- ========================== --> 

## Image Size

<!-- ========================== -->
{%- capture _code -%}
<div class="item">
  <div class="item__image">
    <img class="image image--xs" src="{{ _img_src }}"/>
  </div>
  <div class="item__content">
    <div class="item__header">
      <h4>Photograph</h4>
    </div>
  </div>
</div>
{%- endcapture -%}
<!-- ========================== -->
{{ _code }}
<!-- ========================== -->
```html
{{ _code }}
```
<!-- ========================== --> 

<!-- ========================== --> 
{%- capture _code -%}
<div class="item">
  <div class="item__image">
    <img class="image image--sm" src="{{ _img_src }}"/>
  </div>
  <div class="item__content">
    <div class="item__header">
      <h4>Photograph</h4>
    </div>
    <div class="item__description">
      <p>
        A photograph is an image created by light falling on a photosensitive surface, usually photographic film or an electronic image sensor, such as a CCD or a CMOS chip.
      </p>
    </div>
  </div>
</div>
{%- endcapture -%}
<!-- ========================== -->
{{ _code }}
<!-- ========================== -->
```html
{{ _code }}
```
<!-- ========================== --> 

<!-- ========================== --> 
{%- capture _code -%}
<div class="item">
  <div class="item__image">
    <img class="image image--lg" src="{{ _img_src }}"/>
  </div>
  <div class="item__content">
    <div class="item__header">
      <h4>Photograph</h4>
    </div>
    <div class="item__description">
      <p>
        A photograph is an image created by light falling on a photosensitive surface, usually photographic film or an electronic image sensor, such as a CCD or a CMOS chip.
      </p>
    </div>
  </div>
</div>
{%- endcapture -%}
<!-- ========================== -->
{{ _code }}
<!-- ========================== -->
```html
{{ _code }}
```
<!-- ========================== --> 

see [here]({% link _docs/en/components/images.md %}) for more about image size.
