json.id           author.id
json.name         author.pen_name
json.url          '#/authors/' + author.id.to_s
json.description  author.description
json.following    0
json.followers    0
json.avatar       asset_url(author.avatar.url(:small))
json.favorites    author.favorites
json.bookmarks    author.bookmarks


# eventually call associations here
if show_full
  json.avatarLarge      asset_url(author.avatar.url(:large))

  json.stories do
    json.partial! 'api/stories/story',
      collection: author.stories.order(created_at: :desc), show_full: false, as: :story
  end

  json.tags do
    json.partial! 'api/tags/tag', collection: Tag.page(1).per(15), as: :tag
  end
end
