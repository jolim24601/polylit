class Api::StoriesController < ApplicationController
  def index
    @stories = Story.all
    case feed
    when "top" then @stories = Story.top_stories
    when "recommended" then @stories = Story.most_recommended_stories
    end
  end

  def create
    @story = current_author.stories.new(story_params)
    if @story.save
      render :show
    else
      render json: @story.errors.full_messages, status: 422
    end
  end

  def show
    @story = Story.find(params[:id])
  end

  private

    def story_params
      params.require(:story).permit(:title, :subtitle, :body, :published, :node)
    end
end
