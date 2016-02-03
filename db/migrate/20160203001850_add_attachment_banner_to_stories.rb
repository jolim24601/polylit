class AddAttachmentBannerToStories < ActiveRecord::Migration
  def self.up
    change_table :stories do |t|
      t.attachment :banner
    end
  end

  def self.down
    remove_attachment :stories, :banner
  end
end
