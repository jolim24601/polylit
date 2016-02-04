class Api::FollowsController < ApplicationController
  def create
    @follow = Follow.create(
      follower_id: params[:follower_id],
      followable_id: params[:followable_id],
      followable_type: params[:followable_type]
    )

    render :show
  end

  def show
  end

  def destroy
    @follow = Follow.find_by(
      follower_id: params[:follower_id],
      followable_id: params[:followable_id],
      followable_type: params[:followable_type]
    ).destroy

    render :show
  end
end
