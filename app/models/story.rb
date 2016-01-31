class Story < ActiveRecord::Base
  include Taggable
  include PgSearch
  pg_search_scope :search, against: [
    [:title, 'A'],
    [:subtitle, 'B']
  ], using: { tsearch: { prefix: true } }

  validates :author_id, :node, :wordcount, presence: true
  validates :title, :subtitle, length: {
    maximum: 100,
    too_long: "%{count} characters is the maximum allowed"
  }
  belongs_to :author, inverse_of: :stories

  def top_stories
  end

  def most_recommended_stories
  end
end
