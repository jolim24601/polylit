class Api::AuthorsController < ApplicationController
  before_action :require_logged_out_author

  def create
    @author = Author.new(author_params)
    @author.username ||= @author.email[/[^@]+/]

    if @author.save
      login_author(@author)
      flash[:success] = ["Welcome"]
    else
      flash[:errors] = @author.errors.full_messages
    end

    redirect_to root_url
  end

  def show
    @author = Author.find(params[:id])
  end

  def update
    @author = Author.find(params[:id])
    if @author.update(author_params)
      render json: :show
    else
      render json: @author.errors.full_messages, status: 422
    end
  end

  private

  def author_params
    params.require(:author)
      .permit(:email, :password, :username, :pen_name, :description, :avatar)
  end
end
