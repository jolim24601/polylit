class SessionsController < ApplicationController
  def create
    @author = Author.from_omniauth(request.env['omniauth.auth'])
    if @author.nil?
      render json: { errors: ["Something went wrong."] }, status: 401
    else
      login_author(@author)
      redirect_to root_url + '#/'
    end
  end
end
