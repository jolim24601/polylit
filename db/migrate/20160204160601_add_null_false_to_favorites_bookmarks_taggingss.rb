class AddNullFalseToFavoritesBookmarksTaggingss < ActiveRecord::Migration
  def change
    change_column_null :taggings, :taggable_type, false
    change_column_null :taggings, :taggable_id, false
    change_column_null :favorites, :created_at, false
    change_column_null :favorites, :updated_at, false
    change_column_null :bookmarks, :created_at, false
    change_column_null :bookmarks, :updated_at, false
  end
end
