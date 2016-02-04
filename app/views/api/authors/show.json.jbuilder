json.partial! 'api/authors/author', author: @author

json.avatarLarge  asset_url(@author.avatar.url(:large))
json.favorites    @author.favorites
json.bookmarks    @author.bookmarks

json.stories do
  json.partial! 'api/stories/story',
    collection: @author.stories.order(created_at: :desc), as: :story, hide_node: true
end

json.tags do
  json.partial! 'api/tags/tag', collection: Tag.page(1).per(15), as: :tag
end
