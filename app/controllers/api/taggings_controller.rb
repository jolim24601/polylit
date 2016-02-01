class Api::TaggingsController < ApplicationController
  def create
    tags = params[:tags]
    type = Object.const_get(params[:taggable_type])
    @taggable = type.find(params[:taggable_id])
    @taggable.taggings.map(&:destroy)

    tags.each { |tag| @taggable.tag(tag) }

    if type == Story
      @story = @taggable
      render "api/stories/show"
    end
  end
end
