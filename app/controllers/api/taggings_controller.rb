class Api::TaggingsController < ApplicationController
  def create
    tag = params[:tag]
    type = Object.const_get(params[:taggable_type])
    @taggable = type.find(params[:taggable_id])
    @taggable.tag(tag)

    if type == Story
      @story = @taggable
      render "api/stories/show"
    end
  end

  def destroy
    tag = Tag.find_by(name: params[:tag])
    type = Object.const_get(params[:taggable_type])
    @taggable = type.find(params[:taggable_id])

    @taggable.taggings.where(tag_id: tag.id).delete_all

    if type == Story
      @story = @taggable
      render "api/stories/show"
    end
  end
end
