class Api::UtilsController < ApplicationController
  def search
    @search_results = PgSearch.multisearchable(params[:query])
                              .includes(:searchable)
                              .page(params[:page])
  end
end
