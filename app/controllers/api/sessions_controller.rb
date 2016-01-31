class Api::SessionsController < ApplicationController
  def new
  end

  def destroy
    logout_author!
    render json: {}
  end

  def show
    if current_author
      @author = current_author
      @show_full = false
      render "api/authors/show"
    else
      render json: {}
    end
  end

  def create
    @author = Author.find_by_credentials(
      params[:author][:email],
      params[:author][:password]
    )

    if @author.nil?
      render json: { errors: "Incorrect email/password combination." }, status: 401
    else
      login_author(@author)
      @show_full = false
      render "api/authors/show"
    end
  end
end
