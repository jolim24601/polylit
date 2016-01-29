class Api::SessionsController < ApplicationController
  def new
  end

  def destroy
    logout_author!
  end

  def create
    author = Author.find_by_credentials(
      params[:email],
      params[:password]
    )

    if author
      login_author(author)
      render "api/authors/show"
    else
      render json: @author.errors.full_messages, status: 422
    end
  end
end
