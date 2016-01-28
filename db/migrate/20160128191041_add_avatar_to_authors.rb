class AddAvatarToAuthors < ActiveRecord::Migration
  def self.up
    add_attachment :authors, :avatar
  end

  def self.down
    remove_attachment :authors, :avatar
  end
end
