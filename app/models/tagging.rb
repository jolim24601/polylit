class Tagging < ActiveRecord::Base
  validates :tag, presence: true
  validates_uniqueness_of :tag, scope: [:taggable_id, :taggable_type]

  belongs_to :tag
  belongs_to :taggable, polymorphic: true
end
