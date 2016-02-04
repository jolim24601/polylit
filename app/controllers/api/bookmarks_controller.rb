class Api::BookmarksController < ApplicationController
  def index
    @stories = Story.joins(bookmarks: :author)
                    .where("bookmarks.author_id = ?", current_author.id)

    render "api/stories/index"
  end

  def create
    bookmark = Bookmark.create(bookmark_params)

    @story = bookmark.story
    render "api/stories/show"
  end

  def destroy
    bookmark = Bookmark.find_by(
      author_id: params[:bookmark][:author_id],
      story_id: params[:bookmark][:story_id]).destroy

    @story = bookmark.story
    render "api/stories/show"
  end

  private

    def bookmark_params
      params.require(:bookmark).permit(:author_id, :story_id)
    end
end
