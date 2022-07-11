---
layout: article
date: 2022-06-28
title: Grid
permalink: /docs/en/components/grid
---

<style>
.grid-example {
  background-color: rgba(37, 147, 252, .28);
}
.grid-example .content {
  padding: 5px 0;
  overflow: auto;
  color: #fff;
  word-wrap: normal;
  background-color: #2593fc;
  border: 1px rgba(0, 0, 0, .4) solid;
}
</style>

## Base

Similar to bootstrap, a grid has 12 columns.

<!-- ============= -->
{%- capture _code -%}
<div class="grid">
  <div class="cell cell--6 content">6 cells</div>
  <div class="cell cell--2 content">2 cells</div>
  <div class="cell cell--4 content">4 cells</div>
</div>
{%- endcapture-%}
<!-- ============= -->

<div class="grid-example my-5">
  {{ _code }}
</div>

```html
{{ _code }}
```

## Responsive

Default breakpoint is `md` that means `cell--12` equals `cell--md-12`.\
And if there is no style of the current breakpoint, a smaller style (if this style exists) will be display.

<!-- ============= -->
{%- capture _code -%}
<div class="grid">
  <div class="cell cell--sm-12 cell--lg-6 content">12/12/6 cells</div>
  <div class="cell cell--sm-12 cell--4 cell--lg-2 content">12/4/2 cells</div>
  <div class="cell cell--sm-12 cell--8 cell--lg-4 content">12/8/4 cells</div>
</div>
{%- endcapture-%}
<!-- ============= -->

<div class="grid-example my-5">
  {{ _code }}
</div>

```html
{{ _code }}
```

## Auto Sizing

<style>
.grid-example .content--auto {
  background-color: #ff69b4;
}
</style>

<!-- ============= -->
{%- capture _code -%}
<div class="grid">
  <div class="cell cell--2 content">2 cells</div>
  <div class="cell cell--auto content content--auto">Whatever's left!</div>
</div>
{%- endcapture-%}
<!-- ============= -->

<div class="grid-example my-5">
  {{ _code }}
</div>

```html
{{ _code }}
```

<!-- ============= -->
{%- capture _code -%}
<div class="grid">
  <div class="cell cell--shrink content">shrink</div>
  <div class="cell cell--auto content content--auto">expand</div>
</div>
{%- endcapture-%}
<!-- ============= -->

<div class="grid-example my-5">
  {{ _code }}
</div>

```html
{{ _code }}
```

## Gutters

<!-- ============= -->
{%- capture _code -%}
<div class="grid grid--p-3">
  <div class="cell cell--6">
    <div class="content">6 cells</div>
  </div>
  <div class="cell cell--6">
    <div class="content">6 cells</div>
  </div>
  <div class="cell cell--6">
    <div class="content">6 cells</div>
  </div>
  <div class="cell cell--6">
    <div class="content">6 cells</div>
  </div>
</div>
{%- endcapture-%}
<!-- ============= -->
<div class="grid-example my-5 grid-container">
  {{ _code }}
</div>
<!-- ============= -->
```html
{{ _code }}
```

<!-- ============= -->
{%- capture _code -%}
<div class="grid grid--px-3">
  <div class="cell cell--6">
    <div class="content">6 cells</div>
  </div>
  <div class="cell cell--6">
    <div class="content">6 cells</div>
  </div>
  <div class="cell cell--6">
    <div class="content">6 cells</div>
  </div>
  <div class="cell cell--6">
    <div class="content">6 cells</div>
  </div>
</div>
{%- endcapture-%}
<!-- ============= -->
<div class="grid-example my-5 grid-container">
  {{ _code }}
</div>
<!-- ============= -->
```html
{{ _code }}
```

<!-- ============= -->
{%- capture _code -%}
<div class="grid grid--py-3">
  <div class="cell cell--6">
    <div class="content">6 cells</div>
  </div>
  <div class="cell cell--6">
    <div class="content">6 cells</div>
  </div>
  <div class="cell cell--6">
    <div class="content">6 cells</div>
  </div>
  <div class="cell cell--6">
    <div class="content">6 cells</div>
  </div>
</div>
{%- endcapture-%}
<!-- ============= -->
<div class="grid-example my-5 grid-container">
{{ _code }}
</div>
<!-- ============= -->
```html
{{ _code }}
```
<!-- ============= -->

## Overflow

<!-- ============= -->
{%- capture _code -%}
<div class="grid">
  <div class="cell cell--6">
    <div class="content">loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong</div>
  </div>
  <div class="cell cell--6">
    <div class="content">loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong</div>
  </div>
</div>
{%- endcapture-%}
<!-- ============= -->

<div class="grid-example my-5">
{{ _code }}
</div>

```html
{{ _code }}
```

<!-- ============= -->
{%- capture _code -%}
<div class="grid">
  <div class="cell cell--4">
    <div class="content">loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong</div>
  </div>
  <div class="cell cell--auto">
    <div class="content content--auto">loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong</div>
  </div>
</div>
{%- endcapture-%}
<!-- ============= -->

<div class="grid-example my-5">
{{ _code }}
</div>

```html
{{ _code }}
```

<!-- ============= -->
{%- capture _code -%}
<div class="grid grid--p-3">
  <div class="cell cell--6">
    <div class="content">loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong</div>
  </div>
  <div class="cell cell--6">
    <div class="content">loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong</div>
  </div>
</div>
{%- endcapture-%}
<!-- ============= -->

<div class="grid-example grid-container my-5">
  {{ _code }}
</div>

```html
{{ _code }}
```
