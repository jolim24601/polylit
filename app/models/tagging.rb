class Tagging < ActiveRecord::Base
  validates :tag, presence: true

  belongs_to :tag
  belongs_to :taggable, polymorphic: true
end
