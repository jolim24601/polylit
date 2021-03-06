class Api::TagsController < ApplicationController
  def top_tags
    # currently counts published stories and drafts
    @tags = Tag.select("tags.*, count(taggings.tag_id) as tag_count")
               .joins(stories: :taggings)
               .where("stories.published = true")
               .group("tags.id")
               .order("tag_count DESC")
               .limit(15)

    render :index
  end

  def show
    # grab the tags full details by name
    @tag = Tag.find_by(name: params[:id])
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
