class Api::BookmarksController < ApplicationController
  def create
    @bookmark = Bookmark.create(bookmark_params)

    render "api/bookmarks/show"
  end

  def destroy
    @bookmark = Bookmark.find(params[:id])

    render "api/bookmarks/show"
  end

  private

    def bookmark_params
      params.require(:bookmark).permit(:author_id, :story_id)
    end
end
