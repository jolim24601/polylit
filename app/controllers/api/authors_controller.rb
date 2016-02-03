class Api::AuthorsController < ApplicationController
  def create
    @author = Author.new(author_params)
    debugger
    if author_params[:provider] && author_params[:uid]
    else
      @author.username ||= @author.email[/[^@]+/]
    end

    @show_full = true

    if @author.save
      login_author(@author)
      render :show
    else
      render json: { errors: @author.errors.full_messages }, status: 422
    end
  end

  def show
    @author = Author.find(params[:id])
    @show_full = true
  end

  def update
    @author = Author.find(params[:id])
    @show_full = true
    if @author.update(author_params)
      render :show
    else
      render json: { errors: @author.errors.full_messages }, status: 422
    end
  end

  private

  def author_params
    params.require(:author).permit(
      :email,
      :password,
      :username,
      :pen_name,
      :name,
      :description,
      :avatar,
      :provider,
      :uid
    )
  end
end
