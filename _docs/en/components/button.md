---
layout: article
title: Button
permalink: /docs/en/components/button
---

| Type | Class Names |
| ---- | ---- |
| **base**  | button |
| **type**  | button\-\-primary, button\-\-secondary, button\-\-success, button\-\-info, button\-\-warning, button\-\-error, <br>button\-\-outline\-primary, button\-\-outline\-secondary, button\-\-outline\-success, button\-\-outline\-info, button\-\-outline\-warning, button\-\-outline\-error |
| **shape** | button\-\-pill, button\-\-rounded, button\-\-circle |
| **size**  | button\-\-xs, button\-\-sm, button\-\-md (default), button\-\-lg, button\-\-xl |

## Examples

<!-- ================================ -->
{%- assign types  = 'primary,secondary,success,info,warning,error,outline-primary,outline-secondary,outline-success,outline-info,outline-warning,outline-error' | split: ',' -%}
{%- assign shapes = 'pill,rounded,circle' | split: ',' -%}
{%- assign sizes  = 'xs,sm,md,lg,xl' | split: ',' -%}
<!-- ================================ -->
<style>
.example-button {
  margin: 2px 3px;
}
</style>
<!-- ================================ -->
<script>
{%- capture _code_js -%}
function copyButtonClass(el) {
  var classArr = Array.from(el.classList).filter(function(item) {
    return item != 'example-button';
  });
  var classStr = classArr.join(' ');
  TOOL.copyTextToClipboard(classStr);
  var promptClassArr = classArr.length>3 ? classArr.slice(0,3) : + classArr; 
  var promptClassStr = promptClassArr.join(' ') + '...';
  TOOL.prompt('Successfully copy class "'+ promptClassStr +'" to clipboard!');
}
{%- endcapture -%}
{{ _code_js }}
</script>
<!-- ================================ -->
{%- for _type in types -%}
<p>
{%- capture _code_html -%}
  {%- for _shape in shapes -%}
    {%- for _size in sizes -%}
      {%- case _shape -%}
        {%- when 'circle' -%}
          {%- assign _button_text = 'X' -%}
        {%- else -%}
          {%- assign _button_text = _type | append: ' ' | append: _shape | append: ' ' | append: _size | upcase -%}
      {%- endcase -%}
      <div class="button button--{{ _type }} button--{{ _shape }} button--{{ _size }} example-button"
        onclick="javascript:copyButtonClass(this)"
        data-toggle="popover" 
        data-popper-trigger="hover" 
        data-popper-placement="top" 
        data-popper-title="" 
        data-popper-content="Copy class to Clipboard">
        {{ _button_text }}
      </div>
    {%- endfor -%}
  {%- endfor -%}
{%- endcapture -%}
</p>
{{ _code_html }}
<!-- ================================ -->
{%- capture _titles -%}
html
<!-- split title -->
js
{%- endcapture -%}
{%- capture _contents -%}
```html
{{ _code_html }}
```
<!-- split content -->
```javascript
{{ _code_js }}
```
{%- endcapture -%}
{%- assign _contents = _contents | markdownify -%}
{%- capture _code_tabs -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
{%- endcapture -%}
{%- include article/generate-details.html summary="source code" code=_code_tabs -%}
<!-- ================================ -->
{%- endfor -%}
<!-- ================================ -->

## Type

### Primary

<!-- ============================= -->
{%- capture _code -%}
<div class="button button--primary button--pill">BUTTON</div>
{%- endcapture -%}

{{ _code }}

```html
{{ _code }}
```
<!-- ============================= -->
{%- capture _code -%}
[BUTTON](#){:.button.button--primary.button--pill}
{%- endcapture -%}

{{ _code }}

```html
{{ _code }}
```
<!-- ============================= -->

### Secondary

<!-- ============================= -->
{%- capture _code -%}
<div class="button button--secondary button--pill">BUTTON</div>
{%- endcapture -%}

{{ _code }}

```html
{{ _code }}
```
<!-- ============================= -->
{%- capture _code -%}
[BUTTON](#){:.button.button--secondary.button--pill}
{%- endcapture -%}

{{ _code }}

```html
{{ _code }}
```
<!-- ============================= -->

### Success

<!-- ============================= -->
{%- capture _code -%}
<div class="button button--success button--pill">BUTTON</div>
{%- endcapture -%}

{{ _code }}

```html
{{ _code }}
```
<!-- ============================= -->
{%- capture _code -%}
[BUTTON](#){:.button.button--success.button--pill}
{%- endcapture -%}

{{ _code }}

```html
{{ _code }}
```
<!-- ============================= -->

### Outline

<!-- ============================= -->
{%- capture _code -%}
<div class="button button--outline-success button--pill">BUTTON</div>
{%- endcapture -%}

{{ _code }}

```html
{{ _code }}
```
<!-- ============================= -->
{%- capture _code -%}
[BUTTON](#){:.button.button--outline-success.button--pill}
{%- endcapture -%}

{{ _code }}

```html
{{ _code }}
```
<!-- ============================= -->

## Shape

### Pill

<!-- ============================= -->
{%- capture _code -%}
<div class="button button--primary button--pill">BUTTON</div>
{%- endcapture -%}

{{ _code }}

```html
{{ _code }}
```
<!-- ============================= -->
{%- capture _code -%}
[BUTTON](#){:.button.button--primary .button--pill}
{%- endcapture -%}

{{ _code }}

```html
{{ _code }}
```
<!-- ============================= -->

### Rounded

<!-- ============================= -->
{%- capture _code -%}
<div class="button button--primary button--rounded">BUTTON</div>
{%- endcapture -%}

{{ _code }}

```html
{{ _code }}
```
<!-- ============================= -->
{%- capture _code -%}
[BUTTON](#){:.button.button--primary .button--rounded}
{%- endcapture -%}

{{ _code }}

```html
{{ _code }}
```
<!-- ============================= -->

### Circle

<!-- ============================= -->
{%- capture _code -%}
<div class="button button--primary button--circle">X</div>
{%- endcapture -%}

{{ _code }}

```html
{{ _code }}
```
<!-- ============================= -->
{%- capture _code -%}
[X](#){:.button.button--primary.button--circle}
{%- endcapture -%}

{{ _code }}

```html
{{ _code }}
```
<!-- ============================= -->

### Tag

<!-- ============================= -->
{%- capture _code -%}
<div class="button button--primary button--tag">BUTTON</div>
{%- endcapture -%}

{{ _code }}

```html
{{ _code }}
```
<!-- ============================= -->
{%- capture _code -%}
[BUTTON](#){:.button.button--primary.button--tag}
{%- endcapture -%}

{{ _code }}

```html
{{ _code }}
```
<!-- ============================= -->

## Size

### Extreme Small

<!-- ============================= -->
{%- capture _code -%}
<div class="button button--primary button--rounded button--xs">BUTTON</div>
{%- endcapture -%}
{{ _code }}
```html
{{ _code }}
```
<!-- ============================= -->

### Small

<!-- ============================= -->
{%- capture _code -%}
<div class="button button--primary button--rounded button--sm">BUTTON</div>
{%- endcapture -%}
{{ _code }}
```html
{{ _code }}
```
<!-- ============================= -->

### Middle

<!-- ============================= -->
{%- capture _code -%}
<div class="button button--primary button--rounded">BUTTON</div>
{%- endcapture -%}
{{ _code }}
```html
{{ _code }}
```
<!-- ============================= -->

### Large

<!-- ============================= -->
{%- capture _code -%}
<div class="button button--primary button--rounded button--lg">BUTTON</div>
{%- endcapture -%}
{{ _code }}
```html
{{ _code }}
```
<!-- ============================= -->

### Extreme Large

<!-- ============================= -->
{%- capture _code -%}
<div class="button button--primary button--rounded button--xl">BUTTON</div>
{%- endcapture -%}
{{ _code }}
```html
{{ _code }}
```
<!-- ============================= -->

## Action

### Popper

| Attribute | require | value |
| ---- | ---- |
| **data-toggle**  | true | popover |
| **data-popper-trigger**  | true | click, hover, focus |
| **data-popper-placement**  | false | top, left, right, bottom |
| **data-popper-title**  | false |  |
| **data-popper-content**  | true |  |

<!-- ============================= -->
{%- assign _trigger_list = 'click,hover,focus' | split: ',' -%}
{%- assign _placement_list = 'left,top,bottom,right' | split: ',' -%}
<!-- ============================= -->
{%- for _trigger in _trigger_list -%}
<!-- ============================= -->
{%- capture _code_html -%}
{%- for _placement in _placement_list -%}
<div class="button button--primary button--pill example-button" 
data-toggle="popover" 
data-popper-trigger="{{ _trigger }}" 
data-popper-placement="{{ _placement }}" 
data-popper-title="Popper Title for {{ _trigger }}" 
data-popper-content="Popper Content for {{ _trigger }}">
{{ _trigger }} to show popover
</div>
{%- endfor -%}
{%- endcapture -%}
<!-- ============================= -->
{%- capture _code_highlight -%}
```html
{{ _code_html }}
```
{%- endcapture -%}
<!-- ============================= -->
{%- assign _code_highlight = _code_highlight | markdownify -%}
<!-- ============================= -->
{{ _code_html }}
{{ _code_highlight }}
<!-- ============================= -->
{%- endfor -%}
<!-- ============================= -->
