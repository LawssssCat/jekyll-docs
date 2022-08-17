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
{%- capture _demo_html_base -%}
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
{%- endcapture -%}
<!-- ============================================= -->

## Animation

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
{{ _demo_html_base }}
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

<!-- ============================================= -->
<style>
{%- capture _code_css -%}
#example-swiper-without_animation {
  {{ _demo_css_base }}
}
{%- endcapture -%}
{{ _code_css | scssify }}
</style>
{%- capture _code_html -%}
<div class="swiper my-3" id="example-swiper-without_animation" data-swiper-animation='close'>
{{ _demo_html_base }}
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

button color.

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
{{ _demo_html_base }}
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
{{ _demo_html_base }}
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
    &:nth-child(even) {
      background: url({% link assets/images/cover2.jpg %});
      background-position: center;
      background-size: cover;
    }
    &:nth-child(odd) {
      background: url({% link assets/images/cover3.jpg %});
      background-position: 50% 50%; // same as center
      background-size: cover;
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
{{ _demo_html_base }}
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

## Hero

see [here]({% link _docs/en/components/hero.md %}) for more about Hero.

<!-- ============================================= -->
<style>
{%- capture _code_css -%}
#example-swiper-hero {
  .swiper__slide {
    font-size: 3rem;
    color: #fff;
    &:nth-child(even) {
      background: url({% link assets/images/cover2.jpg %});
      background-position: center; // background-position: 50% 50%;
      background-size: cover;
    }
    &:nth-child(odd) { // difference for comparison
      .hero {
        background: url({% link assets/images/cover3.jpg %});
        background-position: 50% 50%;
        background-size: cover;
      }
    }
  }
}
{%- endcapture -%}
{{ _code_css | scssify }}
</style>

<div class="swiper my-3" id="example-swiper-hero">
<div class="swiper__slides">
    {%- for _index in (1..5) -%}
      <div class="swiper__slide">
        <div class="hero hero--image hero--dark hero--center">
          <div class="hero__content">
            <h3>Hero {{ _index }}</h3>
            <p>There's a hero, If you look inside your heart,</p>
            <p>You don't have to be afraid of what you are.</p>
          </div>
        </div>
      </div>
    {%- endfor  -%}
  </div>
  <div class="swiper__button swiper__button--prev fas fa-chevron-left"></div>
  <div class="swiper__button swiper__button--next fas fa-chevron-right"></div>
</div>
