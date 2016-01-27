json.array!(@stories) do |story|
  json.partial!('story', story: story, show_full: false)
end
