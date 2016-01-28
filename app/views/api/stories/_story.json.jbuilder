json.extract! story, :id, :title, :subtitle
json.author do
  json.name        story.author.pen_name
  json.url         url_for(json.author)
  json.description story.author.description
  json.following   0
  json.followers   0
end
json.node       story.node if show_full
json.timeAgo    time_ago_in_words(story.created_at)
json.readTime   (story.wordcount / 200).to_s + ' min read'
json.favorites  0
json.responses  0
