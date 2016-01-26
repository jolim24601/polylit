class Api::AuthorsController < ApplicationController
  def create
    @author = Author.new(author_params)

    if @author.save
      login_author(@author)
      flash[:success] = ["Welcome"]
    else
      flash.now[:errors] = @author.errors.full_messages
      redirect_to root_url
    end
  end

  def show
  end

  private

  def author_params
    params.require(:author)
      .permit(:email, :password, :username, :pen_name, :description)
  end
end
