class Api::TaggingsController < ApplicationController
  def create
    tags = params[:tags]
    type = Object.const_get(params[:type])
    @taggable = type.find(params[:taggable].id)
    @taggable.taggings.map(&:destroy)
    tags.each do |tag|
      @taggable.taggings.create(tag_id: tag.id)
    end

    if type == Story
      @story = @taggable
      render "api/stories/show"
    end
  end
end
