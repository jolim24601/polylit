class RemoveBodyFromStories < ActiveRecord::Migration
  def change
    remove_column :stories, :body
  end
end
