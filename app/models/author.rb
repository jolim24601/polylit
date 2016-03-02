class Author < ActiveRecord::Base
  include Authentication
  include PgSearch
  include Followable

  alias_attribute :name, :pen_name

  multisearchable against: :name
  PgSearch.multisearch_options = { using: { tsearch: { prefix: true } } }
  pg_search_scope :search, against: [:pen_name, :username],
                           using: { tsearch: { prefix: true } }

  validates :password_digest, :pen_name, presence: true
  validates :username, :email, uniqueness: true, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :description, length: { maximum: 140, allow_nil: true }

  attr_reader :password

  has_many :stories, inverse_of: :author, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  has_many :sessions, dependent: :destroy
  has_many :following, foreign_key: :follower_id, class_name: "Follow"

  has_attached_file :avatar, default_url: 'avatar.png'
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/
end
