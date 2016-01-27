class Api::StoriesController < ApplicationController
  def index
    @stories = Story.all
    case feed
    when "top" then @stories = Story.top_stories
    when "recommended" then @stories = Story.most_recommended_stories
      
  end

  def create
    @story = Story.new(story_params)
    @story.save
  end

  def show
    @story = Story.find(params[:id])
  end

  private

    def story_params
      params.require(:story).permit(:title, :subtitle, :body, :published)
    end
end
