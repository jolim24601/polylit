class Tag < ActiveRecord::Base
  include PgSearch
  multisearchable against: [:name]

  validates :name, presence: true
  validates :name, length: {
    maximum: 25,
    too_long: "%{count} characters is the maximum allowed"
  }

  has_many :taggings
  has_many :stories, through: :taggings, source: :taggable, source_type: Story
end
