class AddDefaultToFavoritesCountOnStories < ActiveRecord::Migration
  def change
    change_column_null :stories, :favorites_count, false
    change_column_default :stories, :favorites_count, 0
  end
end
