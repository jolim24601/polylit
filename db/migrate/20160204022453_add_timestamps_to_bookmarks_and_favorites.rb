class AddTimestampsToBookmarksAndFavorites < ActiveRecord::Migration
  def change
    add_column(:bookmarks, :created_at, :datetime)
    add_column(:bookmarks, :updated_at, :datetime)
    add_column(:favorites, :created_at, :datetime)
    add_column(:favorites, :updated_at, :datetime)
  end
end
