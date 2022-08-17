---
layout: article
title: Alert
permalink: /docs/en/components/alert
---

<!-- =========================================== -->
{%- capture _summary -%}
source code
{%- endcapture -%}
<!-- =========================================== -->

<!-- =========================================== -->
{%- capture _code -%}
Success Text.
{:.success}
{%- endcapture -%}
{{ _code }}
{%- capture _code_highlight -%}
{%- highlight markdown -%}
{{ _code }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-details.html code=_code_highlight summary=_summary -%}
<!-- =========================================== -->

<!-- =========================================== -->
{%- capture _code -%}
Info Text.
{:.info}
{%- endcapture -%}
{{ _code }}
{%- capture _code_highlight -%}
{%- highlight markdown -%}
{{ _code }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-details.html code=_code_highlight summary=_summary -%}
<!-- =========================================== -->

<!-- =========================================== -->
{%- capture _code -%}
Warning Text.
{:.warning}
{%- endcapture -%}
{{ _code }}
{%- capture _code_highlight -%}
{%- highlight markdown -%}
{{ _code }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-details.html code=_code_highlight summary=_summary -%}
<!-- =========================================== -->

<!-- =========================================== -->
{%- capture _code -%}
Error Text.
{:.error}
{%- endcapture -%}
{{ _code }}
{%- capture _code_highlight -%}
{%- highlight markdown -%}
{{ _code }}
{%- endhighlight -%}
{%- endcapture -%}
{%- include article/generate-details.html code=_code_highlight summary=_summary -%}
<!-- =========================================== -->

