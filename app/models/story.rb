class Story < ActiveRecord::Base
  include Taggable
  include PgSearch
  pg_search_scope :search, against: [
    [:title, 'A'],
    [:subtitle, 'B']
  ], using: { tsearch: { prefix: true } }

  validates :author_id, :node, :wordcount, presence: true

  validates_length_of :title, maximum: 100,
    too_long: "%{count} characters is the maximum allowed"
  validates_length_of :subtitle, maximum: 100,
    too_long: "%{count} words is the maximum allowed",
    tokenizer: ->(str) { str.scan(/\w+/) }

  belongs_to :author, inverse_of: :stories

  def top_stories
  end

  def most_recommended_stories
  end
end
