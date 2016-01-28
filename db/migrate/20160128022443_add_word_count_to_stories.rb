class AddWordCountToStories < ActiveRecord::Migration
  def change
    add_column :stories, :wordcount, :integer, null: false
  end
end
