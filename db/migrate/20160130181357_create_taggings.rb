class CreateTaggings < ActiveRecord::Migration
  def change
    create_table :taggings do |t|
      t.integer :tag_id, null: false, index: true
      t.belongs_to :taggable, polymorphic: true, index: true
      t.timestamps null: false
    end
  end
end
