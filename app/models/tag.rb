class Tag < ActiveRecord::Base
  include PgSearch
  multisearchable against: :name
  PgSearch.multisearch_options = { using: { tsearch: { prefix: true } } }
  pg_search_scope :search, against: :name, using: { tsearch: { prefix: true } }

  validates :name, presence: true
  validates :name, uniqueness: { case_sensitive: false }
  validates :name, length: {
    maximum: 25,
    too_long: "%{count} characters is the maximum allowed"
  }

  has_many :taggings
  has_many :stories, through: :taggings, source: :taggable, source_type: Story
end
