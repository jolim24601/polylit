class Api::UtilsController < ApplicationController
  def search
    case params[:type]
    when "Predictive"
      @search_results = PgSearch.multisearch(params[:query])
                                .includes(:searchable)
                                .page(1)
                                .per(25 * params[:page].to_i)
                                .map(&:searchable)
    when "Story"
      @search_results = Story.search(params[:query])
                             .page(1)
                             .per(Story.default_per_page * params[:page].to_i)
    when "Tag"
      @search_results = Tag.search(params[:query])
                            .page(1)
                            .per(Story.default_per_page * params[:page].to_i)
    when "Author"
      @search_results = Author.search(params[:query])
                              .page(1)
                              .per(Story.default_per_page * params[:page].to_i)
    end
  end
end
