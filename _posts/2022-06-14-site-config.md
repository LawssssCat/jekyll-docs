---
layout: article
---

{% raw %}

## site

path | type of config | name | type of date | mean | default
--   | ---            | ---  | ---          | ---  | ---
`_config.yml`      | | `baseurl` | string | the base url of the webpage.  | `/`
`_config.yml`      | | `lang`    | string | the language of the webpage. <br>see <http://www.lingoes.net/en/translator/langcode.htm> | `en`
`_data/locale.yml` | | `{{lang}}.{{key}}` | string | the value represents the localized representation of the `key` that will display in the webpag. | 
`_data/navigation.yml` | | `header[{{index}}].name` | string | the value will display in navigation row of the webpag. <br> if it's start with `:`, the final value is taken from `_data/locale.yml`| 
`_config.yml`      | | `author` | obj |  | 
`_data/variables.yml` | | `pageview.enable` | boolean | | true

## page 

path | type of config | name | type of date | mean | default
--   | ---            | ---  | ---          | ---  | ---
`{page.path}`      | | `lang` | string | the language of the page. see <http://www.lingoes.net/en/translator/langcode.htm> | `{{site.lang}}`
`{page.path}`      | front matter | `permalink` | url
`{page.path}`      | front matter | `key` | string
`{page.path}`      | front matter | `cover` | url 
`{page.path}`      | front matter | `article_header` | obj
`{page.path}`      | front matter | `article_header.type` | `cover` or `overload`
`{page.path}`      | front matter | `article_header.image` | obj
`{page.path}`      | front matter | `article_header.image.src` | url
`{page.path}`      | front matter | `article_header.image.style` | css

### author

path | type of config | name | type of date | mean | default
--   | ---            | ---  | ---          | ---  | ---
`_data/variables.yml`      |  | `default.page.show_author_profile` | boolean | | `false`
`{layout}`      | front matter | `show_author_profile` | boolean | | `site.data.default.page.show_author_profile`
`{page.path}`      | front matter | `show_author_profile` | boolean | | `{layout}.show_author_profile`
`{author}`      | | `avatar` | url | | 
`{author}`      | | `url` | url | |

### article

priority: 
1. page front matter (site.default.xxx)
2. layout front matter
3. `_data/variables` `default.page.{xxx}`

path | type of config | name | type of date | mean | default
--   | ---            | ---  | ---          | ---  | ---
   |                | `show_article_info_read_by_count` | boolean | | true
   |                | `show_article_info_reading_time` | boolean | | true
   |                | `show_article_info_publish_on` | boolean | | true
   |                | `show_article_info_tags` | boolean | | true
   |                | `show_article_title` | boolean | | true
   |                | `show_article_title_edit_on_github` | boolean | | true
 `site` | | `repository` | boolean | obj |
 `site` | | `repository.platform` | boolean | string |
 `site` | | `repository.name` | boolean | string | 
 `site` | | `repository.tree` | boolean | string |
   |                | `show_article_footer_horizontal_rule` | boolean | | false
   |                | `show_btn_change_theme` | boolean | | true
   |                | `show_article_footer_navigation` | boolean | | false
   |                | `show_author_profile` | boolean | | false
   |                | `show_subscribe` | boolean | | false
   |                | `license` | string | license name. data define in `_data/license.yml` | false
 `_data.navigation`  |  | `key` | string | work with `nav_key` | 
 page | front matter | `nav_key` | string | work with `_data.navigation` | 
 page | front matter | `original_link` | url | if not site url, please use absolute url | `page.url`

{% endraw %}
