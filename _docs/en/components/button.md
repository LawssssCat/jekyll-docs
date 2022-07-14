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
[SPACE]
    {%- endfor -%}
  {%- endfor -%}
{%- endcapture -%}
</p>
<!-- ================================ -->
{{ _code_html | replace: "[SPACE]", "" | strip }}
<!-- ================================ -->
{%- capture _titles -%}
html
<!-- split title -->
js
{%- endcapture -%}
{%- capture _contents -%}
```html
{{ _code_html | replace: "[SPACE]", "" | strip }}
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

<!-- ================================================================================================================================ -->

## Type

<!-- ================================ -->
{%- assign _title_h3_list = "primary,secondary,success,outline" | split: "," -%}
{%- for _title_h3 in _title_h3_list -%}
{%- capture _code_block_h3 -%}
<!-- ============================= -->
### {{ _title_h3 | capitalize }} 
{: #{{ _title_h3 }}}

<!-- ============================= -->
{%- capture _code -%}
<div class="button button--{{ _title_h3 }} button--pill">BUTTON</div>
{%- endcapture -%}

{{ _code }}

```html
{{ _code }}
```
<!-- ============================= -->
{%- capture _code -%}
[BUTTON](#{{ _title_h3 }}){:.button.button--{{ _title_h3 }}.button--pill}
{%- endcapture -%}

{{ _code }}

```html
{{ _code }}
```
<!-- ============================= -->
{%- endcapture -%}
{{ _code_block_h3 | markdownify }}
{%- endfor -%}

<!-- ================================================================================================================================ -->

## Shape

<!-- ================================ -->
{%- assign _title_h3_list = "pill,rounded,circle,tag" | split: "," -%}
{%- for _title_h3 in _title_h3_list -%}

{%- case _title_h3 -%}
  {%- when 'circle' -%}
    {%- assign _button_content_h3 = "X" -%}
  {%- else -%}
    {%- assign _button_content_h3 = "BUTTON" -%}
{%- endcase -%}

{%- capture _code_block_h3 -%}
<!-- ============================= -->
### {{ _title_h3 | capitalize }} 
{: #{{ _title_h3 }}}

<!-- ============================= -->
{%- capture _code -%}
<div class="button button--primary button--{{ _title_h3 }}">{{ _button_content_h3 }}</div>
{%- endcapture -%}

{{ _code }}

```html
{{ _code }}
```
<!-- ============================= -->
{%- capture _code -%}
[{{ _button_content_h3 }}](#{{ _title_h3 }}){:.button.button--primary.button--{{ _title_h3 }}}
{%- endcapture -%}

{{ _code }}

```html
{{ _code }}
```
<!-- ============================= -->
{%- endcapture -%}
{{ _code_block_h3 | markdownify }}
{%- endfor -%}

<!-- ================================================================================================================================ -->

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
{%- assign _trigger_list = 'click,hover' | split: ',' -%}
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
[SPACE]
{%- endfor -%}
{%- endcapture -%}
<!-- ============================= -->
{%- capture _code_highlight -%}
```html
{{ _code_html | replace: "[SPACE]", "" | strip }}
```
{%- endcapture -%}
{%- assign _code_highlight = _code_highlight | markdownify -%}
<!-- ============================= -->
{{ _code_html | replace: "[SPACE]", "" | strip }}
{{ _code_highlight }}
<!-- ============================= -->
{%- endfor -%}
<!-- ============================= -->

<!-- ============================= -->
{%- capture _code_html -%}
{%- for _placement in _placement_list -%}
<input class="example-button"
placeholder="focus to show popper"
data-toggle="popover" 
data-popper-trigger="focus" 
data-popper-placement="{{ _placement }}" 
data-popper-title="Popper Title for focus" 
data-popper-content="Popper Content for focus">
[SPACE]
{%- endfor -%}
{%- endcapture -%}
<!-- ============================= -->
{%- capture _code_highlight -%}
```html
{{ _code_html | replace: "[SPACE]", "" | strip }}
```
{%- endcapture -%}
{%- assign _code_highlight = _code_highlight | markdownify -%}
<!-- ============================= -->
{{ _code_html | replace: "[SPACE]", "" | strip }}
{{ _code_highlight }}
<!-- ============================= -->
