class Favorite < ActiveRecord::Base
  validates :author, :story, presence: true
  validates :author, uniqueness: { scope: :story }

  belongs_to :story, counter_cache: true
  belongs_to :author
end
