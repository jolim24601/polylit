class AddNodeColumnToStories < ActiveRecord::Migration
  def change
    add_column :stories, :node, :json, null: false
  end
end
