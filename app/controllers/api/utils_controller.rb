class Api::UtilsController < ApplicationController
  def search
    case params[:type]
    when "Predictive"
      @search_results = PgSearch.multisearch(params[:query])
                                .includes(:searchable)
                                .page(params[:page])
                                .map(&:searchable)
    when "Story"
      @search_results = Story.search(params[:query]).page(params[:page])
    when "Tag"
      @search_results = Tag.search(params[:query]).page(params[:page])
    when "Author"
      @search_results = Author.search(params[:query]).page(params[:page])
    end
  end
end
