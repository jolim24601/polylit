class SessionsController < ApplicationController
  before_action :require_logged_out_author, only: [:create, :new]

  def new
  end

  def destroy
    logout_author!
    redirect_to root_url
  end

  def create
    author = Author.find_by_credentials(
      params[:author][:email],
      params[:author][:password]
    )

    if author.nil?
      flash.now[:errors] = ["Incorrect email/password combination."]
      render :new
    else
      flash[:success] = ["Welcome"]
      redirect_to root_url
    end
  end
end
