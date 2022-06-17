#!/usr/bin/env ruby
#
# Check for changed posts

Jekyll::Hooks.register(:site, :pre_render) do |site|

  # insert posts last modify 
  Jekyll.logger.debug "Hook: insert posts last modify"
  site.collection_names.each do | collection_name |
    _collection = site.collections[collection_name]
    _collection.docs.each do | post |
      # puts post.url
      commit_num = `git rev-list --count HEAD "#{ post.path }"`
      if commit_num.to_i > 0
        lastmod_date = `git log -1 --pretty="%ad" --date=iso "#{ post.path }"`
        post.data['last_modified_at'] = lastmod_date
      end
    end
  end

end
