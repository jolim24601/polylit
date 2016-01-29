json.id           author.id
json.name         author.pen_name
json.url          '#/authors/' + author.id.to_s
json.description  author.description
json.following    0
json.followers    0
json.avatar       author.avatar.url(:small)

# eventually call associations here
if show_full
  json.favorites        0
  json.avatarLarge      author.avatar.url(:large)
  json.twitter          'https://twitter.com/'
  json.facebook         'https://facebook.com/'

  json.stories do
    json.partial! 'api/stories/story', collection: author.stories, show_full: false, as: :story
  end
end
