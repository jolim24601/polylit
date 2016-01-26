class AuthorsController < ApplicationController
  before_action :require_logged_out_author

  def new
    @author = Author.new
  end
end
