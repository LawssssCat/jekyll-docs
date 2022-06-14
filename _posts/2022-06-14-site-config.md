---

---

{% raw %}

## site

path | type of config | name | type of date | mean | default
--   | ---            | ---  | ---          | ---  | ---
`_config.yml`      | | `baseurl` | string | the base url of the webpage.  | `/`
`_config.yml`      | | `lang`    | string | the language of the webpage. <br>see <http://www.lingoes.net/en/translator/langcode.htm> | `en`
`_data/locals.yml` | | `{{lang}}.{{key}}` | string | the value represents the localized representation of the `key` that will display in the webpag. | 
`_data/navigation.yml` | | `header[{{index}}].name` | string | the value will display in navigation row of the webpag. <br> if it's start with `:`, the final value is taken from `_data/locals.yml`| 

## page 

path | type of config | name | type of date | mean | default
--   | ---            | ---  | ---          | ---  | ---
`{page.path}`      | | `lang`    | string | the language of the page. see <http://www.lingoes.net/en/translator/langcode.htm> | `{{site.lang}}`

{% endraw %}
