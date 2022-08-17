---
layout: article
title: liquid
permalink: /liquid
---

Jekyll provides a number of useful Liquid additions - <https://jekyllrb.com/docs/liquid/>

> + liquid docs - <https://shopify.github.io/liquid/> (official)
> + liquid docs - <https://liquidjs.com/zh-cn/tutorials/intro-to-liquid.html>


## Links

Linking to pages - <https://jekyllrb.com/docs/liquid/tags/#link>

If we want to access the site resources, we may not be able to access them by static links. The site resources may have change the output position due to permalink configuration.

Therefore, if we want to access resources in the station, we need to use `links` tag. To use `links` tag, we need to provide he path to the post, page, or collection is defined as the path relative to the root directory (where your config file is) to the file.

```liquid
{% raw %}// render after
{% link _collection/name-of-document.md %}
{% link _posts/2016-07-26-name-of-post.md %}
{% link news/index.html %}
{% link /assets/files/doc.pdf %}{% endraw %}

// render result
/{baseurl}/{dynamic output path}
```

Linking to posts - https://jekyllrb.com/docs/liquid/tags/#linking-to-posts

If you are afraid that once you modify the source location of the post, all links of the post will be broken. You can try `post_url` tag, which only needs the post file name.(but if there is a duplicate post file name, it will only prompt in the warn log, and randomly select a post output location to return.)

```liquid
{% raw %}{% post_url 2010-07-21-name-of-post %}{% endraw %}
```