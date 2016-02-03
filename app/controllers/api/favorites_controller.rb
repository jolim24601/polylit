class Api::FavoritesController < ApplicationController
  def create
    favorite = Favorite.create(favorite_params)
    @story = favorite.story
    render "api/stories/show"
  end

  def destroy
    favorite = Favorite.find_by(
      author_id: params[:favorite][:author_id],
      story_id: params[:favorite][:story_id]).destroy
    @story = favorite.story
    render "api/stories/show"
  end

  private

    def favorite_params
      params.require(:favorite).permit(:author_id, :story_id)
    end
end
