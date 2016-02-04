json.results do
  json.array! @search_results do |result|
    if result.class == Story
      json.partial! "api/stories/story", story: result
    elsif result.class == Author
      json.partial! "api/authors/author", author: result
    elsif result.class == Tag
      json.partial! "api/tags/tag", tag: result
    end

    json._type result.class.to_s || "MISC"
  end
end
