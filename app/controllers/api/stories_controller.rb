class Api::StoriesController < ApplicationController
  def index
    @stories = Story.includes(:tags, author: :follows)
                    .where(published: true)
                    .order(created_at: :desc)
                    .limit(25 * params[:page].to_i)

  end

  def top_stories
    # retrieve from redis cache, expires every 6 hours
    @stories = Story.top_stories
                    .first(25 * params[:page].to_i)

    render :index
  end



  def by_tag
    tag = Tag.find_by(name: params[:name])

    @stories = tag.stories
                  .where(published: true)
                  .order(created_at: :desc)

    render :index
  end

  def followed_stories
    # stories where the author has a follower that is the current author
    if current_author
      @stories = Story.includes(:tags)
                      .joins(author: :follows)
                      .where(follows: { follower_id: current_author.id })
                      .where(published: true)
                      .order(created_at: :desc)
                      .limit(3)
    else
      @stories = []
    end

    render :index
  end

  def create
    @story = current_author.stories.new(story_params)
    if @story.save
      current_author.favorites.create(story_id: @story.id)
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
      params
        .require(:story)
        .permit(:title, :subtitle, :published, :node, :wordcount, :banner)
    end
end
