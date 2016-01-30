json.results do
  json.array! @search_results do |result|
    case search_result.class
    when "Tag"
    when "Author"
    when "Publication"
    end
  end
end
