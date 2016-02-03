class Bookmark < ActiveRecord::Base
  validates :story, :author, presence: true
  validates :author, uniqueness: { scope: :story }

  belongs_to :story
  belongs_to :author
end
