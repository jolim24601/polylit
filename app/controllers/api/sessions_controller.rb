class Api::SessionsController < ApplicationController
  def new
  end

  def destroy
    logout_author!
  end

  def create
    author = Author.find_by_credentials(
      params[:author][:email],
      params[:author][:password]
    )

    if author.nil?
      render json: ["Incorrect email/password combination."], status: 402
    else
      login_author(author)
      render "api/authors/show"
    end
  end
end
