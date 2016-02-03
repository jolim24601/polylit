class Favorite < ActiveRecord::Base
  validates :author, :story, presence: true
  validates :author, uniqueness: { scope: :story }

  belongs_to :story
  belongs_to :author
end
