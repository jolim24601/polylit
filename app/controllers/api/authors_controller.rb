class Api::AuthorsController < ApplicationController
  def create
    @author = Author.new(author_params)
    @author.username ||= @author.email[/[^@]+/]

    if @author.save
      login_author(@author)
      render :show
    else
      render json: { errors: @author.errors.full_messages }, status: 422
    end
  end

  def show
    @author = Author.includes(:favorites, :bookmarks, :follows).find(params[:id])
  end

  def update
    @author = Author.find(params[:id])
    if @author.update(author_params)
      render :show
    else
      render json: { errors: @author.errors.full_messages }, status: 422
    end
  end

  def destroy
    Author.find(params[:id]).destroy
    render json: {}
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
