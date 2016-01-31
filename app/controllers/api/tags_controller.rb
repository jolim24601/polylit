class Api::TagsController < ApplicationController
  def index
    @tags = Tag.search(params[:name])
  end

  def create
    @tag = Tag.save(name: params[:name])
    render "api/tags/show"
  end

  private

    def tag_params
      params.require(:tag).permit(:name)
    end
end
