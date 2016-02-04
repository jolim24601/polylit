class Api::FollowsController < ApplicationController
  def create
    Follow.create(follow_params)
    @author = Author.find(params[:follower_id])
    render "api/authors/show"
  end

  def destroy
    Follow.find_by(
      follower_id: params[:follower_id],
      followable_id: params[:followable_id],
      followable_type: params[:followable_type]
    ).destroy

    @author = Author.find(params[:follower_id])
    render "api/authors/show"
  end
end
