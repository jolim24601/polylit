class Author < ActiveRecord::Base
  include Authentication
  after_initialize :ensure_session_token

  validates :username, :password_digest, :pen_name, presence: true
  validates :email, :session_token, uniqueness: true, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password

  has_many :stories, inverse_of: :author
end
