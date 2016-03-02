class SessionsController < ApplicationController
  def create
    begin
      Author.from_omniauth(request.env['omniauth.auth'])
    rescue => e
      # render json: { errors: e.message }, status: 401
      # redirect back to page for now
      redirect_to root_url + '#/auth'
    else
      login_author(@author)
      redirect_to root_url + '#/'
    end
  end
end
