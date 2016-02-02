class Api::StoriesController < ApplicationController
  def index
    @stories = Story.page(1)
      .per(Story.default_per_page * params[:page].to_i)
      .where(published: true)
      .order(created_at: :desc)
  end

  def top_stories
    # by favorites
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

  def update
    @story = Story.find(params[:id])
    @story.update(story_params)

    render :show
  end

  def destroy
    @story = Story.find(params[:id])
    @story.destroy

    render :show
  end

  private

    def story_params
      params.require(:story)
        .permit(:title, :subtitle, :published, :node, :wordcount)
    end
end
