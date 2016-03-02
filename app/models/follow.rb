class Follow < ActiveRecord::Base
  validates :follower, presence: true
  validates_uniqueness_of :follower, scope: [:followable_id, :followable_type]

  belongs_to :follower, class_name: "Author", foreign_key: :follower_id, counter_cache: :following_count
  belongs_to :followable, polymorphic: true
end
