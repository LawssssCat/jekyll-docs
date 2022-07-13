---
layout: article
title: Swiper
permalink: /docs/en/components/swiper
---

{%- assign _demo_height = '220px' -%}

## Normal

<!-- ============================================= -->
<style>
{%- capture _code_css -%}
#example-swiper-normal {
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
