---
layout: article
title: Checkbox
permalink: /docs/en/components/checkbox
---

## Radios

<!-- ============================= -->
{%- capture _code -%}
<div class="radio-box">
  <input class="radio-input" type="radio" name="exampleRadioName" id="exampleRadioId1">
  <label class="radio-label" for="exampleRadioId1">
    Default radio
  </label>
</div>
<div class="radio-box">
  <input class="radio-input" type="radio" name="exampleRadioName" id="exampleRadioId2" checked>
  <label class="radio-label" for="exampleRadioId2">
    Default checked radio
  </label>
</div>
<div class="radio-box">
  <input class="radio-input" type="radio" name="exampleRadioName" id="exampleRadioId3" disabled>
  <label class="radio-label" for="exampleRadioId3">
    Default disabled radio
  </label>
</div>
{%- endcapture -%}
<!-- ============================= -->

{{ _code }}

```html
{{ _code }}
```

## Switch

<!-- ============================= -->
{%- capture _code -%}
<div class="switch-box">
  <input class="switch-input" type="checkbox" id="switch111">
  <label class="switch-label" for="switch111">Default switch checkbox input</label>
</div>
<div class="switch-box">
  <input class="switch-input" type="checkbox" id="switch222" checked>
  <label class="switch-label" for="switch222">Default switch checkbox input</label>
</div>
<div class="switch-box">
  <input class="switch-input" type="checkbox" id="switch333" disabled>
  <label class="switch-label" for="switch333">Default switch checkbox input</label>
</div>
<div class="switch-box">
  <input class="switch-input" type="checkbox" id="switch444" disabled checked>
  <label class="switch-label" for="switch444">Default switch checkbox input</label>
</div>
{%- endcapture -%}
<!-- ============================= -->

{{ _code }}

```html
{{ _code }}
```
