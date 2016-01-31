json.totalCount @search_results.total_count

json.results do
  json.array! @search_results do |result|
    if result.class == Story
      json.partial! "api/stories/story", story: result, show_full: false
    elsif result.class == Author
      json.partial! "api/authors/author", author: result, show_full: false
    elsif result.class == Tag
      json.partial! "api/tags/tag", tag: result
    end

    json._type result.class.to_s
  end
end
