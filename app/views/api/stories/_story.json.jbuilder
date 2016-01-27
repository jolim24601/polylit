json.story do
  json.title      story.title
  json.subtitle   story.subtitle
  json.created_at story.created_at
end

json.body story.body if show_full
