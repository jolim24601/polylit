class CreateFavorites < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
      t.integer :author_id, null: false
      t.integer :story_id, null: false
    end
    add_foreign_key :favorites, :authors
    add_foreign_key :favorites, :stories
    add_index :favorites, :author_id
    add_index :favorites, :story_id
    add_index :favorites, [:story_id, :author_id]
  end
end
