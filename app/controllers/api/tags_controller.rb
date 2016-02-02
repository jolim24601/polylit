class Api::TagsController < ApplicationController
  def top_tags
    @tags = Tag.select("tags.*, count(taggings.tag_id) as tag_count")
               .joins(:taggings)
               .group("tags.id")
               .order("tag_count DESC")
               .limit(12)

    render :index
  end

  def index
  end

  def show
  end

  def create
    @tag = Tag.save(name: params[:name])
    render :show
  end

  private

    def tag_params
      params.require(:tag).permit(:name)
    end
end
