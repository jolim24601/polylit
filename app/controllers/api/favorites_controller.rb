class Api::FavoritesController < ApplicationController
  def create
    @favorite = Favorite.create(favorite_params)

    render "api/favorites/show"
  end

  def destroy
    @favorite = Favorite.find(params[:id]).destroy

    render "api/favorites/show"
  end

  private

    def favorite_params
      params.require(:favorite).permit(:author_id, :story_id)
    end
end
