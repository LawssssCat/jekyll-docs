---
layout: article
title: Hero
permalink: /docs/en/components/hero
---

{%- assign _background_color = '#ccc' -%}
{%- capture _background_image -%}
{% link assets/images/cover2.jpg %}
{%- endcapture -%}

## Text Align

### Normal

<!-- ====================================================== -->
{%- capture _code_html -%}
<div class="hero my-3" id="example-001">
  <div class="hero__content">
    <h3>Hero</h3>
  </div>
</div>
{%- endcapture -%}
<style>
{% capture _code_css %}
#example-001 {
  background: {{ _background_color }}
}
{% endcapture %}
{{ _code_css }}
</style>
{{ _code_html }}
<!-- ====================================================== -->
{%- capture _titles -%}
html
<!-- split title -->
css
{%- endcapture -%}
{%- capture _contents -%}
{%- highlight html -%}
{{ _code_html }}
{%- endhighlight -%}
<!-- split content -->
{%- highlight css -%}
{{ _code_css }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ====================================================== -->

### Center

<!-- ====================================================== -->
{%- capture _code_html -%}
<div class="hero hero--center my-3" id="example-002">
  <div class="hero__content">
    <h3>Hero</h3>
  </div>
</div>
{%- endcapture -%}
{%- capture _code_css -%}
#example-002 {
  background: {{ _background_color }}
}
{%- endcapture -%}
<style>
{{ _code_css }}
</style>
{{ _code_html }}
<!-- ====================================================== -->
{%- capture _titles -%}
html
<!-- split title -->
css
{%- endcapture -%}
{%- capture _contents -%}
{%- highlight html -%}
{{ _code_html }}
{%- endhighlight -%}
<!-- split content -->
{%- highlight css -%}
{{ _code_css }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ====================================================== -->

## Text Theme

### Dark

<!-- ====================================================== -->
{%- capture _code_html -%}
<div class="hero hero--dark my-3" id="example-014">
  <div class="hero__content">
    <h3>Hero</h3>
  </div>
</div>
{%- endcapture -%}
{%- capture _code_css -%}
#example-014 {
  background: {{ _background_color }}
}
{%- endcapture -%}
<style>
{{ _code_css }}
</style>
{{ _code_html }}
<!-- ====================================================== -->
{%- capture _titles -%}
html
<!-- split title -->
css
{%- endcapture -%}
{%- capture _contents -%}
{%- highlight html -%}
{{ _code_html }}
{%- endhighlight -%}
<!-- split content -->
{%- highlight css -%}
{{ _code_css }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ====================================================== -->

### Light

<!-- ====================================================== -->
{%- capture _code_html -%}
<div class="hero hero--light my-3" id="example-014">
  <div class="hero__content">
    <h3>Hero</h3>
  </div>
</div>
{%- endcapture -%}
{%- capture _code_css -%}
#example-014 {
  background: {{ _background_color }}
}
{%- endcapture -%}
<style>
{{ _code_css }}
</style>
{{ _code_html }}
<!-- ====================================================== -->
{%- capture _titles -%}
html
<!-- split title -->
css
{%- endcapture -%}
{%- capture _contents -%}
{%- highlight html -%}
{{ _code_html }}
{%- endhighlight -%}
<!-- split content -->
{%- highlight css -%}
{{ _code_css }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ====================================================== -->

## Background Image

<details>
  <summary>full picture</summary>
  <img class="image" src="{{ _background_image }}"/>
</details>

### title

<!-- ====================================================== -->
{%- capture _code_html -%}
<div class="hero hero--image hero--dark my-3" id="example-012">
  <div class="hero__content">
    <h3>Hero</h3>
  </div>
</div>
{%- endcapture -%}
{%- capture _code_css -%}
#example-012 {
  background-image: url("{{ _background_image }}");
}
{%- endcapture -%}
<style>
{{ _code_css }}
</style>
{{ _code_html }}
<!-- ====================================================== -->
{%- capture _titles -%}
html
<!-- split title -->
css
{%- endcapture -%}
{%- capture _contents -%}
{%- highlight html -%}
{{ _code_html }}
{%- endhighlight -%}
<!-- split content -->
{%- highlight css -%}
{{ _code_css }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ====================================================== -->

### paragraph

<!-- ====================================================== -->
{%- capture _code_html -%}
<div class="hero hero--image hero--dark my-3" id="example-013">
  <div class="hero__content">
    <h3>Hero</h3>
    <p>There's a hero, If you look inside your heart,</p>
    <p>You don't have to be afraid of what you are.</p>
  </div>
</div>
{%- endcapture -%}
{%- capture _code_css -%}
#example-013 {
  background-image: url("{{ _background_image }}");
}
{%- endcapture -%}
<style>
{{ _code_css }}
</style>
{{ _code_html }}
<!-- ====================================================== -->
{%- capture _titles -%}
html
<!-- split title -->
css
{%- endcapture -%}
{%- capture _contents -%}
{%- highlight html -%}
{{ _code_html }}
{%- endhighlight -%}
<!-- split content -->
{%- highlight css -%}
{{ _code_css }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ====================================================== -->

#### center

<!-- ====================================================== -->
{%- capture _code_html -%}
<div class="hero hero--image hero--dark hero--center my-3" id="example-113">
  <div class="hero__content">
    <h3>Hero</h3>
    <p>There's a hero, If you look inside your heart,</p>
    <p>You don't have to be afraid of what you are.</p>
  </div>
</div>
{%- endcapture -%}
{%- capture _code_css -%}
#example-113 {
  background-image: url("{{ _background_image }}");
}
{%- endcapture -%}
<style>
{{ _code_css }}
</style>
{{ _code_html }}
<!-- ====================================================== -->
{%- capture _titles -%}
html
<!-- split title -->
css
{%- endcapture -%}
{%- capture _contents -%}
{%- highlight html -%}
{{ _code_html }}
{%- endhighlight -%}
<!-- split content -->
{%- highlight css -%}
{{ _code_css }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ====================================================== -->

#### filter (customize style)

<!-- ====================================================== -->
{%- capture _code_html -%}
<div class="hero hero--image hero--dark hero--center my-3" id="example-114">
  <div class="hero__content">
    <h3>Hero</h3>
    <p>There's a hero, If you look inside your heart,</p>
    <p>You don't have to be afraid of what you are.</p>
  </div>
</div>
{%- endcapture -%}
{%- capture _code_css -%}
#example-114 {
  background-image: linear-gradient(135deg, rgba(255, 69, 0, .5), rgba(255, 197, 0, .2)), url("{{ _background_image }}");
}
{%- endcapture -%}
<style>
{{ _code_css }}
</style>
{{ _code_html }}
<!-- ====================================================== -->
{%- capture _titles -%}
html
<!-- split title -->
css
{%- endcapture -%}
{%- capture _contents -%}
{%- highlight html -%}
{{ _code_html }}
{%- endhighlight -%}
<!-- split content -->
{%- highlight css -%}
{{ _code_css }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-tabs.html titles=_titles contents=_contents -%}
<!-- ====================================================== -->
