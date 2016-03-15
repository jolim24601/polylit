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
  has_many :favorites, dependent: :destroy
  has_many :bookmarks, dependent: :destroy

  has_attached_file :banner, default_url: ""
  validates_attachment_content_type :banner, content_type: /\Aimage\/.*\Z/

  def self.top_stories
    Rails.cache.fetch("top-stories", :expires_in => 3.hours) do
      force_top_stories
    end
  end

  def self.force_top_stories
    Story.includes(:tags, author: :follows)
         .where(published: true)
         .order(favorites_count: :desc)

  end
end
