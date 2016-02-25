class Api::FavoritesController < ApplicationController
  def create
    Story.find(favorite_params[:story_id])
         .favorites
         .create!(author_id: favorite_params[:author_id])

    @author = current_author
    render "api/authors/show"
  end

  def destroy
    Favorite.find_by(
      author_id: favorite_params[:author_id],
      story_id: favorite_params[:story_id]
    ).destroy

    @author = current_author
    render "api/authors/show"
  end

  private

    def favorite_params
      params.require(:favorite).permit(:author_id, :story_id)
    end
end
