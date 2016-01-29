class Author < ActiveRecord::Base
  include Authentication
  after_initialize :ensure_session_token

  validates :username, :password_digest, :pen_name, presence: true
  validates :email, :session_token, uniqueness: true, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :description, length: { maximum: 140, allow_nil: true }
  alias_attribute :name, :pen_name
  attr_reader :password

  has_many :stories, inverse_of: :author
  has_attached_file :avatar, default_url: 'avatar.png', styles: {
    small: '36x36>',
    large: '100x100>'
  }

  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/
end
