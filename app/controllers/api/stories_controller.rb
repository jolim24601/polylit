class Api::StoriesController < ApplicationController
  def index
    @stories = Story.page(1)
                    .per(Story.default_per_page * params[:page].to_i)
                    .where(published: true)
                    .order(created_at: :desc)
  end

  def top_stories
    @stories = Story.page(1)
                    .per(5)
                    .where(published: true)
                    .order(created_at: :desc)

    render :index
  end

  def by_tag
    tag = Tag.find_by(name: params[:name])
    @stories = tag.stories
                  .page(1)
                  .per(Story.default_per_page * params[:page].to_i)
                  .where(published: true)
                  .order(created_at: :desc)

    render :index
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
