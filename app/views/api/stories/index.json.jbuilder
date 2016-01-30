json.array!(@stories) do |story|
  json.partial! 'api/stories/story', story: story, show_full: false
end
