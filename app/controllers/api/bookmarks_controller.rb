class Api::BookmarksController < ApplicationController
  def index
    @stories = Story.joins(bookmarks: :author)
                    .where("bookmarks.author_id = ?", current_author.id)
                    .order("bookmarks.created_at DESC")
                    .limit(25 * params[:page].to_i)

    render "api/stories/index"
  end

  def create
    bookmark = Bookmark.create(bookmark_params)

    @author = current_author
    render "api/authors/show"
  end

  def destroy
    bookmark = Bookmark.find_by(
      author_id: params[:bookmark][:author_id],
      story_id: params[:bookmark][:story_id]).destroy

    @author = current_author
    render "api/authors/show"
  end

  private

    def bookmark_params
      params.require(:bookmark).permit(:author_id, :story_id)
    end
end
