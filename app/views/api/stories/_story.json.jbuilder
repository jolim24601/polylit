json.extract!       story, :id, :title, :subtitle, :author_id
json.timeAgo        time_ago_in_words(story.created_at)
json.published      story.published
json.favoritesCount story.favorites_count
json.responses      0


unless story.banner.url.empty?
  json.banner         "http://res.cloudinary.com/polylit/image/upload/remote_media/#{story.banner.url.gsub!(/.*?(?=stories)/im, "")}"
end

json.lastUpdated    story.updated_at.strftime("%m/%d")

read_time = (story.wordcount / 200).to_s + ' min read'
if story.published
  json.draftedAgo story.created_at.strftime("Published on %m/%d")
  json.readTime   read_time
else
  json.draftedAgo "Last edited " + time_ago_in_words(story.updated_at) + " ago"
  json.readTime   read_time + " (#{pluralize(story.wordcount, 'word')}) so far"
end

json.author do
  json.partial! 'api/authors/author', author: story.author
end

json.tags do
  json.partial! 'api/tags/tag', collection: story.tags, as: :tag
end

json.node story.node unless defined? hide_node
