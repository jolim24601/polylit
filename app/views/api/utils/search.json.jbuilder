json.totalCount @search_results.total_count

json.results do
  json.array! @search_results do |result|
    case search_result.class
    when "Story"
      json.partial! "api/stories/story", story: result, show_full: false
    when "Author"
      json.partial! "api/authors/author", author: result, show_full: false
    when "Tag"
      json.partial! "api/tags/tag", tag: result
    when "Publication"
    end

    json._type result.class.to_s
  end
end
