class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.integer :author_id, null: false
      t.string :title
      t.string :subtitle
      t.text :body, null: false
      t.boolean :published, default: false

      t.timestamps null: false
    end

    add_index :stories, :author_id
    add_index :stories, :title
  end
end
