---
layout: article
title: Card
permalink: /docs/en/components/card
---

<!-- ============== -->
{%- capture _img_src -%}
{% link assets/images/cover1_with_title.svg %}
{%- endcapture -%}
<!-- ============== -->
{%- capture _img_style -%}
background: #1fefff;
{%- endcapture -%}
<!-- ============== -->

## Image

<!-- ============== -->
{%- capture _code -%}
<div class="card">
  <div class="card__image">
    <img class="image" src="{{ _img_src }}" style="{{ _img_style }}"/>
  </div>
</div>
{%- endcapture -%}
<!-- ============== -->
{{ _code }}
<!-- ============== -->
```html
{{ _code }}
```
<!-- ============== -->

## Content

<!-- ============== -->
{%- capture _code -%}
<div class="card">
  <div class="card__content">
    <div class="card__header">
      <h4>Photograph</h4>
    </div>
    <p>A photograph is an image created by light falling on a photosensitive surface, usually photographic film or an electronic image sensor, such as a CCD or a CMOS chip.</p>
  </div>
</div>
{%- endcapture -%}
<!-- ============== -->
{{ _code }}
<!-- ============== -->
```html
{{ _code }}
```
<!-- ============== -->


## Image and Content

<!-- ============== -->
{%- capture _code -%}
<div class="card">
  <div class="card__image">
    <img class="image" src="{{ _img_src }}" style="{{ _img_style }}"/>
  </div>
  <div class="card__content">
    <div class="card__header">
      <h4>Photograph</h4>
    </div>
  </div>
</div>
{%- endcapture -%}
<!-- ============== -->
{{ _code }}
<!-- ============== -->
```html
{{ _code }}
```
<!-- ============== -->

<!-- ============== -->
{%- capture _code -%}
<div class="card">
  <div class="card__image">
    <img class="image" src="{{ _img_src }}" style="{{ _img_style }}"/>
  </div>
  <div class="card__content">
    <div class="card__header">
      <h4>Photograph</h4>
    </div>
    <p>
      A photograph is an image created by light falling on a photosensitive surface, usually photographic film or an electronic image sensor, such as a CCD or a CMOS chip.
    </p>
  </div>
</div>
{%- endcapture -%}
<!-- ============== -->
{{ _code }}
<!-- ============== -->
```html
{{ _code }}
```
<!-- ============== -->

## Image Overlay

<!-- ============== -->
{%- capture _code -%}
<div class="card card--overlay">
  <div class="card__image">
    <img class="image" src="{{ _img_src }}" style="{{ _img_style }}"/>
  </div>
  <div class="card__content">
    <p class="card__header">Photograph</p>
  </div>
</div>
{%- endcapture -%}
<!-- ============== -->
{{ _code }}
<!-- ============== -->
```html
{{ _code }}
```
<!-- ============== -->

<!-- ============== -->
{%- capture _code -%}
<div class="card card--overlay card--overlay-top">
  <div class="card__image">
    <img class="image" src="{{ _img_src }}" style="{{ _img_style }}"/>
  </div>
  <div class="card__content">
    <p class="card__header">Photograph</p>
  </div>
</div>
{%- endcapture -%}
<!-- ============== -->
{{ _code }}
<!-- ============== -->
```html
{{ _code }}
```
<!-- ============== -->

## Flat

<!-- ============== -->
{%- capture _code -%}
<div class="card card--flat">
  <div class="card__image">
    <img class="image" src="{{ _img_src }}" style="{{ _img_style }}"/>
  </div>
  <div class="card__content">
    <div class="card__header">
      <a href="#Flat">Photograph</a>
    </div>
  </div>
</div>
{%- endcapture -%}
<!-- ============== -->
{{ _code }}
<!-- ============== -->
```html
{{ _code }}
```
<!-- ============== -->

## Clickable

<!-- ============== -->
{%- capture _code -%}
<div>
  <div class="card card--clickable">
    <div class="card__image">
      <img class="image" src="{{ _img_src }}" style="{{ _img_style }}"/>
    </div>
  </div>
</div>
{%- endcapture -%}
<!-- ============== -->
{{ _code }}
<!-- ============== -->
```html
{{ _code }}
```
<!-- ============== -->
