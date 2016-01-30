class Story < ActiveRecord::Base
  include Taggable

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
