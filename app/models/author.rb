class Author < ActiveRecord::Base
  include Authentication
  include PgSearch
  include Followable

  multisearchable against: :name
  PgSearch.multisearch_options = { using: { tsearch: { prefix: true } } }
  pg_search_scope :search, against: [:pen_name, :username],
                           using: { tsearch: { prefix: true } }

  after_initialize :ensure_session_token

  validates :username, :password_digest, :pen_name, presence: true
  validates :email, :session_token, uniqueness: true, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :description, length: { maximum: 140, allow_nil: true }
  alias_attribute :name, :pen_name
  attr_reader :password

  has_many :stories, inverse_of: :author, dependent: :destroy
  has_attached_file :avatar, default_url: 'avatar.png', styles: {
    small: '37x37#',
    large: '100x100#'
  }

  has_many :favorites, dependent: :destroy
  has_many :bookmarks, dependent: :destroy

  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/
end
