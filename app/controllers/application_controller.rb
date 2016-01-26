class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_author, :logged_in?

  def current_author
    @current_author ||= Author.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !!current_author
  end

  def require_logged_in_author
    redirect_to root_url unless logged_in?
  end

  def require_logged_out_author
    redirect_to root_url if logged_in?
  end

  def login_author(author)
    session[:session_token] = author.reset_session_token!
  end

  def logout_author!
    current_author.reset_session_token!
    session[:sesion_token] = nil
  end
end
