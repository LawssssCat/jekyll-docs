---
layout: article
title: Swiper
permalink: /docs/en/components/swiper
---

<!-- ============================================= -->
{%- assign _demo_height = '220px' -%}
<!-- ============================================= -->
{%- capture _demo_css_base -%}
  height: {{ _demo_height }};
  .swiper__slide {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: #fff;
    &:nth-child(even) {
      background-color: #ff69b4;
    }
    &:nth-child(odd) {
      background-color: #2593fc;
    }
  }
{%- endcapture -%}
<!-- ============================================= -->

## Normal

<!-- ============================================= -->
<style>
{%- capture _code_css -%}
#example-swiper-normal {
  {{ _demo_css_base }}
}
{%- endcapture -%}
{{ _code_css | scssify }}
</style>
{%- capture _code_html -%}
<div class="swiper my-3" id="example-swiper-normal">
  <div class="swiper__slides">
    <div class="swiper__slide">1</div>
    <div class="swiper__slide">2</div>
    <div class="swiper__slide">3</div>
    <div class="swiper__slide">4</div>
    <div class="swiper__slide">5</div>
    <div class="swiper__slide">6</div>
    <div class="swiper__slide">7</div>
  </div>
  <div class="swiper__button swiper__button--prev fas fa-chevron-left"></div>
  <div class="swiper__button swiper__button--next fas fa-chevron-right"></div>
</div>
{%- endcapture -%}
{{ _code_html }}
{%- capture _titles -%}
html
<!-- split title -->
scss
{%- endcapture -%}
{%- capture _contents -%}
```html
{{ _code_html }}
```
<!-- split content -->
```scss
{{ _code_css }}
```
{%- endcapture -%}
{%- assign _contents = _contents | markdownify -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ============================================= -->

## Light Theme

button color. same as normal.

<!-- ============================================= -->
<style>
{%- capture _code_css -%}
#example-swiper-light {
  {{ _demo_css_base }}
}
{%- endcapture -%}
{{ _code_css | scssify }}
</style>
{%- capture _code_html -%}
<div class="swiper swiper--light my-3" id="example-swiper-light">
  <div class="swiper__slides">
    <div class="swiper__slide">1</div>
    <div class="swiper__slide">2</div>
    <div class="swiper__slide">3</div>
    <div class="swiper__slide">4</div>
    <div class="swiper__slide">5</div>
    <div class="swiper__slide">6</div>
    <div class="swiper__slide">7</div>
  </div>
  <div class="swiper__button swiper__button--prev fas fa-chevron-left"></div>
  <div class="swiper__button swiper__button--next fas fa-chevron-right"></div>
</div>
{%- endcapture -%}
{{ _code_html }}
{%- capture _titles -%}
html
<!-- split title -->
scss
{%- endcapture -%}
{%- capture _contents -%}
```html
{{ _code_html }}
```
<!-- split content -->
```scss
{{ _code_css }}
```
{%- endcapture -%}
{%- assign _contents = _contents | markdownify -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ============================================= -->

## Dark Theme

button color.

<!-- ============================================= -->
<style>
{%- capture _code_css -%}
#example-swiper-dark {
  {{ _demo_css_base }}
}
{%- endcapture -%}
{{ _code_css | scssify }}
</style>
{%- capture _code_html -%}
<div class="swiper swiper--dark my-3" id="example-swiper-dark">
  <div class="swiper__slides">
    <div class="swiper__slide">1</div>
    <div class="swiper__slide">2</div>
    <div class="swiper__slide">3</div>
    <div class="swiper__slide">4</div>
    <div class="swiper__slide">5</div>
    <div class="swiper__slide">6</div>
    <div class="swiper__slide">7</div>
  </div>
  <div class="swiper__button swiper__button--prev fas fa-chevron-left"></div>
  <div class="swiper__button swiper__button--next fas fa-chevron-right"></div>
</div>
{%- endcapture -%}
{{ _code_html }}
{%- capture _titles -%}
html
<!-- split title -->
scss
{%- endcapture -%}
{%- capture _contents -%}
```html
{{ _code_html }}
```
<!-- split content -->
```scss
{{ _code_css }}
```
{%- endcapture -%}
{%- assign _contents = _contents | markdownify -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ============================================= -->

## Images

<!-- ============================================= -->
{%- capture _demo_css_image -%}
  height: {{ _demo_height }};
  .swiper__slide {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: #fff;
    background-position: center;
    background-size: cover;
    &:nth-child(even) {
      background: url({% link assets/images/cover2.jpg %});
    }
    &:nth-child(odd) {
      background: url({% link assets/images/cover3.jpg %});
    }
  }
{%- endcapture -%}
<!-- ============================================= -->

<!-- ============================================= -->
<style>
{%- capture _code_css -%}
#example-swiper-images {
  {{ _demo_css_image }}
}
{%- endcapture -%}
{{ _code_css | scssify }}
</style>
{%- capture _code_html -%}
<div class="swiper my-3" id="example-swiper-images">
  <div class="swiper__slides">
    <div class="swiper__slide">1</div>
    <div class="swiper__slide">2</div>
    <div class="swiper__slide">3</div>
    <div class="swiper__slide">4</div>
    <div class="swiper__slide">5</div>
    <div class="swiper__slide">6</div>
    <div class="swiper__slide">7</div>
  </div>
  <div class="swiper__button swiper__button--prev fas fa-chevron-left"></div>
  <div class="swiper__button swiper__button--next fas fa-chevron-right"></div>
</div>
{%- endcapture -%}
{{ _code_html }}
{%- capture _titles -%}
html
<!-- split title -->
scss
{%- endcapture -%}
{%- capture _contents -%}
```html
{{ _code_html }}
```
<!-- split content -->
```scss
{{ _code_css }}
```
{%- endcapture -%}
{%- assign _contents = _contents | markdownify -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ============================================= -->

## Without Animation

<div class="swiper my-3 swiper-demo swiper-demo--4">
  <div class="swiper__wrapper">
    <div class="swiper__slide">1</div>
    <div class="swiper__slide">2</div>
    <div class="swiper__slide">3</div>
    <div class="swiper__slide">4</div>
    <div class="swiper__slide">5</div>
    <div class="swiper__slide">6</div>
    <div class="swiper__slide">7</div>
  </div>
  <div class="swiper__button swiper__button--prev fas fa-chevron-left"></div>
  <div class="swiper__button swiper__button--next fas fa-chevron-right"></div>
</div>