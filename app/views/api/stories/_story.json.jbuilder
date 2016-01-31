json.extract!   story, :id, :title, :subtitle
json.node       story.node if show_full
json.timeAgo    time_ago_in_words(story.created_at)
json.created    story.created_at
json.updated    story.updated_at
json.readTime   (story.wordcount / 200).to_s + ' min read'
json.published  story.published
json.tags       story.tags
json.favorites  0
json.responses  0

unless story.published
  json.readTime += " (#{pluralize(story.wordcount, 'word')}) so far"
end

json.author do
  json.partial! 'api/authors/author', author: story.author, show_full: false
end
