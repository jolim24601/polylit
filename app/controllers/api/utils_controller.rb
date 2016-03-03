class Api::UtilsController < ApplicationController
  def search
    case params[:type]
    when "Predictive"
      @search_results = PgSearch.multisearch(params[:query])
                                .includes(:searchable)
                                .limit(25 * params[:page].to_i)
                                .map(&:searchable)
    when "Story"
      @search_results = Story.search(params[:query])
                             .limit(25 * params[:page].to_i)

    when "Tag"
      @search_results = Tag.search(params[:query])
                           .limit(25 * params[:page].to_i)

    when "Author"
      @search_results = Author.search(params[:query])
                              .limit(25 * params[:page].to_i)

    end
  end
end
