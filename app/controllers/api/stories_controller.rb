class Api::StoriesController < ApplicationController
  def index
    @stories = Story.all.order(created_at: :desc)
  end

  def create
    @story = current_author.stories.new(story_params)
    if @story.save
      render :show
    else
      render json: { errors: @story.errors.full_messages }, status: 422
    end
  end

  def show
    @story = Story.find(params[:id])
  end

  private

    def story_params
      params.require(:story)
        .permit(:title, :subtitle, :published, :node, :wordcount)
    end
end
