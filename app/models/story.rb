class Story < ActiveRecord::Base
  validates :author_id, :body, presence: true
  validates :title, :subtitle, length: { maximum: 100,
    too_long: "%{count} characters is the maximum allowed" }
  belongs_to :author, inverse_of: :story

  def top_stories
  end

  def most_recommended_stories
  end
end
