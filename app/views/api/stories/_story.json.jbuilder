json.extract!   story, :id, :title, :subtitle
json.node       story.node if show_full
json.timeAgo    time_ago_in_words(story.created_at)
json.created    story.created_at
json.updated    story.updated_at
json.published  story.published
json.favorites  0
json.responses  0

read_time = (story.wordcount / 200).to_s + ' min read'
if story.published
  json.readTime read_time
else
  json.readTime read_time + " (#{pluralize(story.wordcount, 'word')}) so far"
end

json.author do
  json.partial! 'api/authors/author', author: story.author, show_full: false
end

json.tags do
  json.partial! 'api/tags/tag', collection: story.tags, as: :tag
end
