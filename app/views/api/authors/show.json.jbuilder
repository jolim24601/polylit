json.partial! 'api/authors/author', author: @author

json.favorites    @author.favorites
json.bookmarks    @author.bookmarks

json.stories do
  json.partial! 'api/stories/story',
    collection: @author.stories.order(created_at: :desc), as: :story, hide_node: true
end

tags = Tag.joins(:follows).where("follows.follower_id = ?", @author.id)

json.tags do
  json.partial! 'api/tags/tag', collection: tags, as: :tag
end
