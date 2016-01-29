json.id           author.id
json.name         author.pen_name
json.url          '#/authors/' + author.id.to_s
json.description  author.description
json.following    0
json.followers    0

# eventually call associations here
if show_full
  json.stories do
    json.partial! 'api/stories/story', collection: author.stories, show_full: false, as: :story
  end
  json.favorites  0
  json.twitter    'https://twitter.com/'
  json.facebook   'https://facebook.com/'
end
