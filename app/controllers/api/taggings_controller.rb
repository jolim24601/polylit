class Api::TaggingsController < ApplicationController
  def create
    tags = params[:tags]
    type = Object.const_get(params[:type])
    @taggable = type.find(params[:taggable].id)
    @taggable.taggings.map(&:destroy)
    tags.each do |tag|
      .taggings.create(tag_id: tag.id)
    end

    render "api/stories/show" @story
  end
end
