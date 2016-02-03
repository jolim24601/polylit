class CreateBookmarks < ActiveRecord::Migration
  def change
    create_table :bookmarks do |t|
      t.integer :author_id, null: false
      t.integer :story_id, null: false
    end
    add_foreign_key :bookmarks, :authors
    add_foreign_key :bookmarks, :stories
    add_index :bookmarks, :author_id
    add_index :bookmarks, :story_id
    add_index :bookmarks, [:author_id, :story_id]
  end
end
