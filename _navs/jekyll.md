---
layout: article
title: Jekyll - docs
---

Jekyll provice a simple way to make a static websit.

+ official website - <https://jekyllrb.com/>
+ github - <https://github.com/jekyll/jekyll>
+ jekyll - variables <https://jekyllrb.com/docs/variables/>

## all posts in this site

<ul>
{%- for post in site.posts -%}
  <li>
    {%- include snippets/get-accessible-url.html url=post.url -%}
    <span>{{ post.title }}</span> - <a href="{{ __return }}">read more</a>
  </li>
{%- endfor -%}
</ul>

## default Configuration

the [source code: configuration.rb](https://github.com/jekyll/jekyll/blob/master/lib/jekyll/configuration.rb) in [jekyll][jekyll-github]

```ruby
DEFAULTS = {
  # Where things are
  "source"              => Dir.pwd,
  "destination"         => File.join(Dir.pwd, "_site"),
  "collections_dir"     => "",
  "cache_dir"           => ".jekyll-cache",
  "plugins_dir"         => "_plugins",
  "layouts_dir"         => "_layouts",
  "data_dir"            => "_data",
  "includes_dir"        => "_includes",
  "collections"         => {},

  # Handling Reading
  "safe"                => false,
  "include"             => [".htaccess"],
  "exclude"             => [],
  "keep_files"          => [".git", ".svn"],
  "encoding"            => "utf-8",
  "markdown_ext"        => "markdown,mkdown,mkdn,mkd,md",
  "strict_front_matter" => false,

  # Filtering Content
  "show_drafts"         => nil,
  "limit_posts"         => 0,
  "future"              => false,
  "unpublished"         => false,

  # Plugins
  "whitelist"           => [],
  "plugins"             => [],

  # Conversion
  "markdown"            => "kramdown",
  "highlighter"         => "rouge",
  "lsi"                 => false,
  "excerpt_separator"   => "\n\n",
  "incremental"         => false,

  # Serving
  "detach"              => false, # default to not detaching the server
  "port"                => "4000",
  "host"                => "127.0.0.1",
  "baseurl"             => nil, # this mounts at /, i.e. no subdirectory
  "show_dir_listing"    => false,

  # Output Configuration
  "permalink"           => "date",
  "paginate_path"       => "/page:num",
  "timezone"            => nil, # use the local timezone

  "quiet"               => false,
  "verbose"             => false,
  "defaults"            => [],

  "liquid"              => {
    "error_mode"       => "warn",
    "strict_filters"   => false,
    "strict_variables" => false,
  },

  "kramdown"            => {
    "auto_ids"      => true,
    "toc_levels"    => (1..6).to_a,
    "entity_output" => "as_char",
    "smart_quotes"  => "lsquo,rsquo,ldquo,rdquo",
    "input"         => "GFM",
    "hard_wrap"     => false,
    "guess_lang"    => true,
    "footnote_nr"   => 1,
    "show_warnings" => false,
  },
}.each_with_object(Configuration.new) { |(k, v), hsh| hsh[k] = v.freeze }.freeze
```


[jekyll-github]: https://github.com/jekyll/jekyll