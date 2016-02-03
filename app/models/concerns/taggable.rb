require 'active_support/concern'

module Taggable
  extend ActiveSupport::Concern

  included do
    has_many :taggings, as: :taggable, dependent: :destroy
    has_many :tags, through: :taggings
  end

  def tag(name)
    name.strip!
    tag = Tag.find_or_create_by(name: name)
    taggings.find_or_create_by(tag_id: tag.id)
  end
end
