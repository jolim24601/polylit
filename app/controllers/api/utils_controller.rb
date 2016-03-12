class Api::UtilsController < ApplicationController
  def search
    case params[:type]
    when "Predictive"
      @search_results = PgSearch.multisearch(params[:query])
                                .includes(:searchable)
                                .map(&:searchable)
    when "Story"
      @search_results = Story.search(params[:query])

    when "Tag"
      @search_results = Tag.search(params[:query])

    when "Author"
      @search_results = Author.search(params[:query])

    end
  end
end
